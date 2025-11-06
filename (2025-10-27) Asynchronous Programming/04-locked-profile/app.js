const mainElement = document.getElementById('main');

function start () {
    mainElement.innerHTML = '';
    loadProfiles();
}

async function loadProfiles () {
    const profilesDataArr = await getProfilesDataArr();
    
    let usersCount = 0;

    for (const profileData of profilesDataArr) {
        mainElement.appendChild(
            createProfile(profileData, ++usersCount)
        );
    }
}

async function getProfilesDataArr () {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const profilesDataObj = await response.json();
    return Object.values(profilesDataObj)
}

function profileButtonClickHandler (event) {
    const profileBtn = event.currentTarget;
    const profileCard = profileBtn.parentElement;
    const hiddenSection = profileCard.getElementsByTagName('div')[0];

    const isLocked = Array
        .from(profileCard.querySelectorAll('input[type="radio"]'))
        .find(radioBtn => radioBtn.checked === true)
        .value === 'lock';

    if (isLocked) return;
    
    const isHidden = (hiddenSection.style.display || 'none') === 'none';

    if (isHidden) {
        hiddenSection.style.display = 'block';
        profileBtn.textContent = 'Hide it';
    } else {
        hiddenSection.style.display = 'none';
        profileBtn.textContent = 'Show more';        
    }
}

function createProfile (profileData, userNo) {
    const profileContainer = document.createElement('div');
    profileContainer.className = 'profile';

    const profileImage = document.createElement('img');
    profileImage.className = 'userIcon';
    profileImage.src = './iconProfile2.png';
    profileContainer.appendChild(profileImage);

    const lockLabel = document.createElement('label');
    lockLabel.textContent = 'Lock';
    profileContainer.appendChild(lockLabel);

    const lockRadioBtn = document.createElement('input');
    lockRadioBtn.type = 'radio';
    lockRadioBtn.name = `user${userNo}Locked`;
    lockRadioBtn.value = 'lock';
    lockRadioBtn.checked = true;
    profileContainer.appendChild(lockRadioBtn);

    const unlockLabel = document.createElement('label');
    unlockLabel.textContent = 'Unlock';
    profileContainer.appendChild(unlockLabel);

    const unlockRadioBtn = document.createElement('input');
    unlockRadioBtn.type = 'radio';
    unlockRadioBtn.name = `user${userNo}Locked`;
    unlockRadioBtn.value = 'unlock';
    profileContainer.appendChild(unlockRadioBtn);

    const lineBreak = document.createElement('br');
    profileContainer.appendChild(lineBreak);

    const separator = document.createElement('hr');
    profileContainer.appendChild(separator);

    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Username';
    profileContainer.appendChild(usernameLabel);

    const usernameField = document.createElement('input');
    usernameField.type = 'text';
    usernameField.name = `user${userNo}Username`;
    usernameField.value = profileData.username;
    usernameField.disabled = true;
    usernameField.readOnly = true;
    profileContainer.appendChild(usernameField);

    const hiddenContainer = document.createElement('div');
    hiddenContainer.className = `user${userNo}Username`;
    hiddenContainer.style.display = 'none';
    profileContainer.appendChild(hiddenContainer);

    const hiddenSeparator = document.createElement('hr');
    hiddenContainer.appendChild(hiddenSeparator);

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    hiddenContainer.appendChild(emailLabel);

    const emailField = document.createElement('input');
    emailField.type = 'email';
    emailField.name = `user${userNo}Email`;
    emailField.value = profileData.email;
    emailField.disabled = true;
    emailField.readOnly = true;
    hiddenContainer.appendChild(emailField);

    const ageLabel = document.createElement('label');
    ageLabel.textContent = 'Age:';
    hiddenContainer.appendChild(ageLabel);

    const ageField = document.createElement('input');
    ageField.type = 'number';
    ageField.name = `user${userNo}Age`;
    ageField.value = profileData.age;
    ageField.disabled = true;
    ageField.readOnly = true;
    hiddenContainer.appendChild(ageField);

    const showAndHideBtn = document.createElement('button');
    showAndHideBtn.textContent = 'Show more';
    profileContainer.appendChild(showAndHideBtn);

    showAndHideBtn.addEventListener('click', profileButtonClickHandler);

    return profileContainer;
}