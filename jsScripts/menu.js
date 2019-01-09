const address = 'https://fast-food-fast-jes.herokuapp.com/api/v1/menu';
const order = document.getElementById('post-order-form');

const getMenu = () => {
  fetch(address)
    .then(res => res.json())
    .then((data) => {
      console.log(data.status);
      console.log(data.message);
    });
};

// const postMenuItem = (menuItem) => {
//   fetch(address, {
//     method: 'POST',
//     body: JSON.stringify(menuItem),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).then((res) => {
//     if (res.ok) {
//       return 'Success';
//     }
//     return res.json();
//   }).then(data => data.message);
// };

const postMenuFormHandler = (e) => {
  e.preventDefault();
  let error = '';
  const resultDiv = document.getElementById('post-order-result');
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
    fetch(address, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        console.log('good');
        resultDiv.innerHTML = 'Success';
        resultDiv.classList.add('success-div');
        resultDiv.style.display = 'block';
        loading.style.display = 'none';
      }
      return res.json();
    }).then((data) => {
      resultDiv.innerHTML = data.message;
      resultDiv.classList.add('error-div');
      resultDiv.style.display = 'block';
      loading.style.display = 'none';
    });
  } else {
    resultDiv.innerHTML = error;
    resultDiv.classList.add('error-div');
    resultDiv.style.display = 'block';
  }
};
// getMenu();

order.onsubmit = postMenuFormHandler;
