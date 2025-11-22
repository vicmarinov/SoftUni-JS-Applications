function createNoCardsMessage () {
    const noCardsMessage = document.createElement('h1');
    noCardsMessage.textContent = 'No ideas yet! Be the first one :)';
    return noCardsMessage;
}

function createIdeaCard (ideaDataObj) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card overflow-hidden current-card details';
    cardElement.setAttribute('style', 'width: 20rem; height: 18rem;');
    cardElement.innerHTML = `
        <div class="card-body">
            <p class="card-text"></p>
        </div>
        <img class="card-image" src="" alt="Card image cap">
        <a class="btn" href="">Details</a>
    `;

    cardElement.querySelector('div.card-body > p.card-text').textContent = ideaDataObj.title;
    cardElement.querySelector('img.card-image').src = ideaDataObj.img;
    cardElement.querySelector('a.btn').href = `/details?ideaId=${ideaDataObj._id}`;

    return cardElement;
}

export const dashboardContentServices = {
    createNoCardsMessage,
    createIdeaCard
};