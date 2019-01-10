const address = 'https://fast-food-fast-jes.herokuapp.com/api/v1/menu';
const menu = document.getElementById('post-menu-form');
const menuContainer = document.getElementById('new-menu-items');

const createMenuTemplate = (menuArray) => {
  let template = '';
  menuArray.forEach((element) => {
    template += `<div id="admin-one-food">
    <div id="one-food-pic">
            <img src="${element.picture}">
    </div>
    <div id="admin-one-food-text">
        <h3>${element.food}</h3>
        <span>${element.description}</span>
        <h3>&#8358;${element.price}</h3>
        <br />
        <button class="good-button">Edit</button>
        <button class="good-button">Delete</button>
    </div>
    </div>`;
  });
  return template;
};

const getMenu = () => {
  fetch(address)
    .then(res => res.json())
    .then((data) => {
      const template = createMenuTemplate(data);
      menuContainer.innerHTML = template;
    });
};

const postMenuFormHandler = (e) => {
  e.preventDefault();
  let error = '';
  const resultDiv = document.querySelector('.post-result');
  const loading = document.querySelector('.loading>img');
  resultDiv.style.display = 'none';
  const title = document.getElementById('new-item-title').value.trim();
  const price = document.getElementById('new-item-price').value.trim();
  const picture = document.getElementById('new-item-picture').value.trim();
  const description = document.getElementById('new-item-description').value.trim();

  if (title === '') {
    error += 'Item title is required <br />';
  } else if (title.length > 45) {
    error += 'Item title is too long <br />';
  }

  if (price === '') {
    error += 'Item price is required <br />';
  } else if (isNaN(parseInt(price))) {
    error += 'Item price is not valid <br />';
  }

  if (picture === '') {
    error += 'Item picture is required <br />';
  } else if (picture.length > 3000) {
    error += 'picture URL is too long <br />';
  }

  if (description === '') {
    error += 'Item description is required <br />';
  } else if (description.length > 480) {
    error += 'Item description is too long <br />';
  }

  if (error === '') {
    const item = {
      title,
      price,
      picture,
      description,
    };
    loading.style.display = 'block';
    let success = false;
    const token = window.localStorage.getItem('token');
    fetch(address, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        success = true;
      }
      return res.json();
    }).then((data) => {
      if (success) {
        resultDiv.innerHTML = 'Success';
        resultDiv.classList.add('success-div');
        resultDiv.classList.remove('error-div');
        resultDiv.style.display = 'block';
        loading.style.display = 'none';
        const menuObj = [];
        menuObj.push(item);
        const template = createMenuTemplate(menuObj);
        // menuContainer.insertBefore(template, menuContainer.firstChild);
      } else {
        resultDiv.innerHTML = data.message;
        resultDiv.classList.add('error-div');
        resultDiv.classList.remove('success-div');
        resultDiv.style.display = 'block';
        loading.style.display = 'none';
      }
    });
  } else {
    resultDiv.innerHTML = error;
    resultDiv.classList.add('error-div');
    resultDiv.classList.remove('success-div');
    resultDiv.style.display = 'block';
  }
};
getMenu();

menu.onsubmit = postMenuFormHandler;
