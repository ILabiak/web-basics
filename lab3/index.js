let users = [];

async function fetchUsers(usersNumber) {
  try {
    const res = await fetch(
      `https://randomuser.me/api/?results=${usersNumber}`
    );
    const data = await res.json();
    users = data.results;
  } catch (err) {
    console.log('Something went wrong!');
  }
}

function createUserBlock(user) {
    const userBlock = document.createElement('div');
    userBlock.classList.add('info-container');
  
    const img = document.createElement('img');
    img.src = user.picture.large;
  
    const textInfo = document.createElement('div');
    textInfo.classList.add('text-info');
  
    const infoFields = [
      { label: 'Cell', value: user.cell },
      { label: 'City', value: user.location.city },
      { label: 'Postcode', value: user.location.postcode },
      { label: 'Email', value: user.email },
    ];
  
    infoFields.forEach((field) => {
      const fieldContainer = document.createElement('div');
      fieldContainer.classList.add('text-info-raw');
  
      const fieldName = document.createElement('p');
      fieldName.textContent = field.label + ':';
  
      const fieldValue = document.createElement('p');
      fieldValue.textContent = field.value;
  
      fieldContainer.appendChild(fieldName);
      fieldContainer.appendChild(fieldValue);
  
      textInfo.appendChild(fieldContainer);
    });
  
    userBlock.appendChild(img);
    userBlock.appendChild(textInfo);
  
    return userBlock;
  }

async function handleBtnClick() {
    const statusElement = document.getElementById('parseStatus')
    const usersCount = document.getElementById('usersCount').value;
    await fetchUsers(usersCount)
    if(users.length < 1) {
        //show error
        statusElement.innerHTML = "Some Error!"
        console.log('error')
        return
    }
    statusElement.innerHTML = "Success!"
    const userBlocksContainer = document.getElementById('userBlocksContainer');
    userBlocksContainer.innerHTML = ''; // Clear existing user blocks
  
    users.forEach((user) => {
      const userBlock = createUserBlock(user);
      userBlocksContainer.appendChild(userBlock);
    });

}
