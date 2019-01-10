const id = window.localStorage.getItem('id');
const address = `https://fast-food-fast-jes.herokuapp.com/api/v1/users/${id}/orders`;
const histContainer = document.getElementById('hist-container');
const resultDiv = document.getElementById('order-result');

const createHistTemplate = (histArray) => {
  let template = '';
  histArray.forEach((element) => {
    template += `<div id="hist-row">
    <div id="hist-pic">
            <img src="${element.picture}">
    </div>
    <div id="title">
        <p>${element.food}</p>
        <span id="order-status">Order status: ${element.status}</span>
    </div>
    <div id="hist-details">
        <div id="detail">${element.date}</div>
        <div id="detail">&#8358;${element.price}</div>
        <div id="detail">${element.quantity} unit</div>
    </div>
    <button class="order-again">Order Again</button>
</div>
<hr />`;
  });
  return template;
};

const getHistory = () => {
  const token = window.localStorage.getItem('token');
  let success = false;
  fetch(address, {
    method: 'GET',
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
      const template = createHistTemplate(data);
      histContainer.innerHTML = template;
      const placeOrder = document.querySelectorAll('.order-again');
      for (let i = 0; i < placeOrder.length; i++) {
        placeOrder[i].onclick = postOrder;
      }
    } else if (data.message === 'Auth failed') {
      resultDiv.innerHTML = 'Please login to see ur order history';
      resultDiv.classList.add('error-div');
      resultDiv.style.display = 'block';
      setInterval(() => {
        window.location = 'https://jesse-efe.github.io/Fast-Food-Fast/UI/sign-in.html';
      }, 1000);
    } else {
      resultDiv.innerHTML = data.message;
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
    }
  });
};

getHistory();
