const address = 'https://fast-food-fast-jes.herokuapp.com/api/v1/menu';
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
        <button class="good-button">Order Now</button>
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

getMenu();
