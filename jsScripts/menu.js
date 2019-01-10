const address = 'https://fast-food-fast-jes.herokuapp.com/api/v1/menu';
const address2 = 'https://fast-food-fast-jes.herokuapp.com/api/v1/orders';
const menuContainer = document.getElementById('new-menu-items');

const createMenuTemplate = (menuArray) => {
  let template = '';
  menuArray.forEach((element) => {
    template += `<div id="admin-one-food">
    <div id="one-food-pic">
      <img src="${element.picture}">
    </div>
    <div id="admin-one-food-text">
      <div id="food-describe">
        <h3>${element.food}</h3>
        <span>${element.description}</span>
      </div>
      <div id="price-button">
        <h3>&#8358;${element.price}</h3>
        <button class="good-button" data-id="${element.id}">Order Now</button>
      </div>
    </div>
    </div>`;
  });
  return template;
};

function postOrder() {
  const menu_id = this.dataset.id;
  console.log(menu_id);
  const token = window.localStorage.getItem('token');
  const customer_id = window.localStorage.getItem('id');
  const order = {
    customer_id,
    menu_id,
    quantity: 1,
  };
  let success = false;
  const resultDiv = document.getElementById('order-result');
  resultDiv.innerHTML = 'Just a moment, we are placing your order...';
  resultDiv.classList.add('success-div');
  resultDiv.classList.remove('error-div');
  resultDiv.style.display = 'block';
  fetch(address2, {
    method: 'POST',
    body: JSON.stringify(order),
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
      resultDiv.innerHTML = 'Order was placed successfully.  See your <a href="https://jesse-efe.github.io/Fast-Food-Fast/UI/order-history.html">Order history</a>';
      resultDiv.classList.add('success-div');
      resultDiv.classList.remove('error-div');
    } else {
      resultDiv.innerHTML = data.message;
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
    }
  });
}

const getMenu = () => {
  fetch(address)
    .then(res => res.json())
    .then((data) => {
      const template = createMenuTemplate(data);
      menuContainer.innerHTML = template;
      const placeOrder = document.querySelectorAll('.good-button');
      for (let i = 0; i < placeOrder.length; i++) {
        placeOrder[i].onclick = postOrder;
      }
    });
};

getMenu();
