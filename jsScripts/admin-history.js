const address = 'https://fast-food-fast-jes.herokuapp.com/api/v1/orders';
const histContainer = document.getElementById('hist-container');
const resultDiv = document.getElementById('order-result');
const token = window.localStorage.getItem('token');

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
  </div>
  <div id="new-admin-buttons">
    <button class="accept-button" data-id="${element.id}">Accept</button>
    <button class="decline-button" data-id="${element.id}">Decline</button>
    <button class="completed-button" data-id="${element.id}">Completed</button>
  </div>
  <hr />`;
  });
  return template;
};

function acceptOrder() {
  const orderId = this.dataset.id;
  const address2 = `https://fast-food-fast-jes.herokuapp.com/api/v1/orders/${orderId}`;
  console.log(address2);
  let success = false;
  resultDiv.innerHTML = 'Just a moment, we are updating order status...';
  resultDiv.classList.add('success-div');
  resultDiv.classList.remove('error-div');
  resultDiv.style.display = 'block';
  fetch(address2, {
    method: 'PUT',
    body: JSON.stringify({
      status: 'processing',
    }),
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
      resultDiv.innerHTML = 'Order status was updated successfully.';
      resultDiv.classList.add('success-div');
      resultDiv.classList.remove('error-div');
    } else if (data.message === 'Auth failed') {
      resultDiv.innerHTML = 'Please login to update order status';
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
      setTimeout(() => {
        window.location = 'https://jesse-efe.github.io/Fast-Food-Fast/UI/sign-in.html';
      }, 1000);
    } else {
      resultDiv.innerHTML = data.message;
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
    }
  });
}

function declineOrder() {
  const orderId = this.dataset.id;
  const address2 = `https://fast-food-fast-jes.herokuapp.com/api/v1/orders/${orderId}`;
  let success = false;
  resultDiv.innerHTML = 'Just a moment, we are updating order status...';
  resultDiv.classList.add('success-div');
  resultDiv.classList.remove('error-div');
  resultDiv.style.display = 'block';
  fetch(address2, {
    method: 'PUT',
    body: JSON.stringify({
      status: 'cancelled',
    }),
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
      resultDiv.innerHTML = 'Order status was updated successfully.';
      resultDiv.classList.add('success-div');
      resultDiv.classList.remove('error-div');
    } else if (data.message === 'Auth failed') {
      resultDiv.innerHTML = 'Please login to update order status';
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
      setTimeout(() => {
        window.location = 'https://jesse-efe.github.io/Fast-Food-Fast/UI/sign-in.html';
      }, 1000);
    } else {
      resultDiv.innerHTML = data.message;
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
    }
  });
}

function completeOrder() {
  const orderId = this.dataset.id;
  const address2 = `https://fast-food-fast-jes.herokuapp.com/api/v1/orders/${orderId}`;
  let success = false;
  resultDiv.innerHTML = 'Just a moment, we are updating order status...';
  resultDiv.classList.add('success-div');
  resultDiv.classList.remove('error-div');
  resultDiv.style.display = 'block';
  fetch(address2, {
    method: 'PUT',
    body: JSON.stringify({
      status: 'completed',
    }),
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
      resultDiv.innerHTML = 'Order status was updated successfully.';
      resultDiv.classList.add('success-div');
      resultDiv.classList.remove('error-div');
    } else if (data.message === 'Auth failed') {
      resultDiv.innerHTML = 'Please login to update order status';
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
      setTimeout(() => {
        window.location = 'https://jesse-efe.github.io/Fast-Food-Fast/UI/sign-in.html';
      }, 1000);
    } else {
      resultDiv.innerHTML = data.message;
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
    }
  });
}

const getHistory = () => {
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
      let hist = document.querySelectorAll('.accept-button');
      for (let i = 0; i < hist.length; i++) {
        hist[i].onclick = acceptOrder;
      }
      hist = document.querySelectorAll('.decline-button');
      for (let i = 0; i < hist.length; i++) {
        hist[i].onclick = declineOrder;
      }
      hist = document.querySelectorAll('.completed-button');
      for (let i = 0; i < hist.length; i++) {
        hist[i].onclick = completeOrder;
      }
    } else if (data.message === 'Auth failed') {
      resultDiv.innerHTML = 'Please login as admin all orders';
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
