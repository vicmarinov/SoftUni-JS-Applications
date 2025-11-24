window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = !!localStorage.getItem('userId');

    document.querySelector('body > header > nav').innerHTML = isLoggedIn ? `
        <a class="active" href="/">Catalog</a>
        <div id="user">
            <a href="/index.html">Create Product</a>
            <a id="logoutBtn" href="javascript:void(0)">Logout</a>
        </div>
    ` : `
        <a class="active" href="/">Catalog</a>
        <div id="guest">
            <a href="/authentication.html">Login</a>
            <a href="/authentication.html">Register</a>
        </div>
    `;

    const mainContainer = document.querySelector('#exercise > div.wrapper > div.card-wrapper > div.row > div.col-md-12');
    mainContainer.innerHTML = ``;

    if (isLoggedIn) {
        mainContainer.innerHTML += `
            <h2>Create Product</h2>
            <form id="create-form" action="" method="post">
                <label>Name: <input type="text" name="name"></label>
                <label>Price: <input type="text" name="price"></label>
                <label>Factor: <input type="text" name="factor"></label>
                <label>Img: <input type="text" name="img"></label>
                <button type="submit">Create</button>
            </form>
            <hr>
        `;
    }

    mainContainer.innerHTML += `
        <table class="table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Decoration factor</th>
                    <th>Mark</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

    if (isLoggedIn) {
        mainContainer.innerHTML += `
            <button id="buy-button">Buy</button>
            <hr>
            <div id="all-orders-info-container"></div>
            <button id="show-orders-btn">All orders</button>
        `;

    }

    document.getElementById('logoutBtn')?.addEventListener('click', onLogoutBtnClicked);
    document.getElementById('create-form')?.addEventListener('submit', onCreateFormSubmit);
    document.getElementById('buy-button')?.addEventListener('click', onBuyButtonClick);
    document.getElementById('show-orders-btn')?.addEventListener('click', onShowAllOrdersButtonClick);

    fillProductsTable(mainContainer.querySelector('table.table > tbody'));
});

async function fillProductsTable (tableBodyElement) {
    try {
        const response = await fetch('http://localhost:3030/data/furniture');
        const productsDataArr = await response.json();

        if (!response.ok) throw new Error(productsDataArr.message);

        tableBodyElement.replaceChildren(
            ...productsDataArr.map(data => createTableRow(data))
        );
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }

    function createTableRow (productData) {
        const tableRow = document.createElement('tr');

        const imageCell = document.createElement('td');
        const imageElement = document.createElement('img');
        imageElement.src = productData.img;
        imageCell.appendChild(imageElement);
        
        const productNameCell = document.createElement('td');
        const productNameElement = document.createElement('p');
        productNameElement.textContent = productData.name;
        productNameCell.appendChild(productNameElement);
        
        const priceCell = document.createElement('td');
        const priceElement = document.createElement('p');
        priceElement.textContent = productData.price;
        priceCell.appendChild(priceElement);
        
        const decorationFactorCell = document.createElement('td');
        const decorationFactorElement = document.createElement('p');
        decorationFactorElement.textContent = productData.factor;
        decorationFactorCell.appendChild(decorationFactorElement);
        
        const checkboxCell = document.createElement('td');
        const checkboxElement = document.createElement('input');
        checkboxElement.type = 'checkbox';
        checkboxElement.value = JSON.stringify(productData);
        if (!localStorage.getItem('userId')) checkboxElement.disabled = true;
        checkboxCell.appendChild(checkboxElement);

        tableRow.appendChild(imageCell);
        tableRow.appendChild(productNameCell);
        tableRow.appendChild(priceCell);
        tableRow.appendChild(decorationFactorCell);
        tableRow.appendChild(checkboxCell);

        return tableRow;
    }
}

function fillOrdersInfoFields (fieldsContainer, userOrdersArr) {
    let productsNamesArr = [];
    let totalPrice = 0;

    
    if (productsNamesArr.length) {
        userOrdersArr.forEach(orderData => {
            orderData.orderedProducts.forEach(productData => {
                if (!productsNamesArr.includes(productData.name)) {
                    productsNamesArr.push(productData.name);
                }
                
                totalPrice += Number(productData.price);
            })
        });
    } else {
        productsNamesArr = ['Nothing bought yet!'];
    }

    // Building a structure like:

    // <div id="all-orders-info-container">
    //     <div class="orders">
    //         <p>Bought furniture: <span>Nothing bought yet!</span></p>
    //         <p>Total price: <span>0 $</span></p>
    //     </div>
    // </div>

    const container = document.createElement('div');
    container.className = 'orders';

    const listLabel = document.createElement('p');
    listLabel.textContent = 'Bought furniture: ';
    container.appendChild(listLabel);

    const listElement = document.createElement('span');
    listElement.textContent = productsNamesArr.join(', ');
    listLabel.appendChild(listElement);

    const priceLabel = document.createElement('p');
    priceLabel.textContent = 'Total price: ';
    container.appendChild(priceLabel);

    const priceElement = document.createElement('span');
    priceElement.textContent = totalPrice + ' $';
    priceLabel.appendChild(priceElement);

    fieldsContainer.replaceChildren(container);
}

async function onLogoutBtnClicked (event) {
    event.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) window.location = '/';

    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': accessToken
            }
        });
        
        if (response.status !== 204) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }

    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    window.location = '/';
}

async function onCreateFormSubmit (event) {
    event.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) window.location = '/';

    const createForm = event.currentTarget;
    const { name, price, factor, img } = Object.fromEntries(
        new FormData(createForm).entries()
    );

    if (!name || !price || !factor || !img) {
        alert('Please fill all the fields');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/data/furniture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': accessToken
            },
            body: JSON.stringify({ name, price, factor, img })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }

    window.location = '/';
}

async function onBuyButtonClick (event) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) window.location = '/';

    const orderedProductsDataArr = Array.from(document.querySelectorAll(
        '#exercise > div.wrapper > div.card-wrapper > div.row > div.col-md-12 > table.table input[type="checkbox"'
    )).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value).map(JSON.parse);

    if (!orderedProductsDataArr.length) {
        alert('Please mark the products you would like to order');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3030/data/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': accessToken
            },
            body: JSON.stringify({ orderedProducts: orderedProductsDataArr })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }

    window.location = '/';
}

async function onShowAllOrdersButtonClick (event) {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId) window.location = '/';

    try {
        const response = await fetch(`http://localhost:3030/data/orders?where=_ownerId%3D"${userId}"`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': accessToken
            }
        });

        const userOrdersArr = await response.json();
        if (!response.ok) {
            throw new Error(userOrdersArr.message);
        }

        fillOrdersInfoFields(
            document.getElementById('all-orders-info-container'),
            userOrdersArr
        );
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }
}