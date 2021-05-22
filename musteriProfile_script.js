const resultList = document.getElementById('results');
let userId = 0;
new URLSearchParams(window.location.search).forEach((value, name) => {
  if (name === 'name')
    document.getElementById(
      'username-holder'
    ).textContent = `Hoşgeldiniz, Sayın ${value}`;
  else {
    userId = value;
    document.getElementById('user-id').value = value;
  }
});

const listProducts_Btn = document.getElementById('list-items');
const listProducts = document.getElementById('menu');
const basket_Btn = document.getElementById('basket');
const basketArea = document.getElementById('basket-area');
const myOrdersArea = document.getElementById('my-orders');
const myOrders_Btn = document.getElementById('list-orders');
const salableBack_Btn = document.getElementById('back-from-salables');
const myOrdersBack_Btn = document.getElementById('back-from-my-orders');
const sepet = [];

const getSellableProducts = function () {
  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let responseJson = JSON.parse(this.responseText);
      listSalable(responseJson);
    }
  };
  xhttpGet.open('GET', 'http://localhost:8080/GET/products/sellable', true);
  xhttpGet.send();
};

const listSalable = function (responseJson) {
  for (const { name, type, id } of responseJson) {
    const productNameDiv = document.createElement('div');
    productNameDiv.classList.add('grid-item');
    productNameDiv.classList.add('product-name');
    productNameDiv.textContent = name;

    const productTypeDiv = document.createElement('div');
    productTypeDiv.classList.add('grid-item');
    productTypeDiv.classList.add('product-type');
    productTypeDiv.textContent = type;

    const orderBtn = document.createElement('button');
    orderBtn.classList.add('grid-item');
    orderBtn.classList.add('order-button');
    orderBtn.textContent = 'Sepete Ekle';
    orderBtn.addEventListener('click', function () {
      const check = document.getElementById(id);
      console.log(check);
      if (check)
        for (const [index, [, , checkId, amount]] of sepet.entries()) {
          if (id === checkId) sepet[index][3] = amount + 1;
        }
      else sepet.push([name, type, id, 1]);
      addToBasket(id, name, type);
      let httpFriendlySepet = '';
      for (const [, , id, amount] of sepet) {
        httpFriendlySepet += `${id},${amount};`;
      }
      document.getElementById('sepet-input').value = httpFriendlySepet;
      console.log(document.getElementById('sepet-input').value);
    });

    listProducts.appendChild(productNameDiv);
    listProducts.appendChild(productTypeDiv);
    listProducts.appendChild(orderBtn);
  }
};

const addToBasket = function (id, name, type) {
  const check = document.getElementById(id);
  if (check) check.textContent = Number(check.textContent) + 1;
  else {
    const orderNameDiv = document.createElement('div');
    orderNameDiv.classList.add('grid-item');
    orderNameDiv.classList.add('ordered-name');
    orderNameDiv.textContent = name;

    const orderTypeDiv = document.createElement('div');
    orderTypeDiv.classList.add('grid-item');
    orderTypeDiv.classList.add('ordered-type');
    orderTypeDiv.textContent = type;

    const orderAmount = document.createElement('div');
    orderAmount.classList.add('grid-item');
    orderAmount.classList.add('ordered-amount');
    orderAmount.id = id;
    orderAmount.textContent = 1;

    basketArea.appendChild(orderNameDiv);
    basketArea.appendChild(orderTypeDiv);
    basketArea.appendChild(orderAmount);
  }
};

listProducts_Btn.addEventListener('click', function () {
  basket_Btn.classList.toggle('hidden');
  salableBack_Btn.classList.toggle('hidden');

  resultList.classList.toggle('grid-hide');
  resultList.style.backgroundColor = 'transparent';
  resultList.style.height = 0;
  resultList.style.margin = 0;

  document.getElementById('order-button').classList.toggle('hidden');
  listProducts.classList.toggle('grid-hide');
  getSellableProducts();
});

basket_Btn.addEventListener('click', function () {
  listProducts.classList.toggle('grid-hide');
  if (listProducts.style.marginTop !== '0px') listProducts.style.marginTop = 0;
  else listProducts.style.marginTop = '15vh';
  basketArea.classList.toggle('grid-hide');
});

const getMyOrders = function () {
  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let responseJson = JSON.parse(this.responseText);
      fillMyOrders(responseJson);
    }
  };
  xhttpGet.open(
    'GET',
    'http://localhost:8080/GET/orders/myOrders?id=' + userId,
    true
  );
  xhttpGet.send();
};

const fillMyOrders = function (responseJson) {
  console.log(responseJson);
  for (const {
    name,
    amount,
    orderDate,
    deadlineDate,
    shipping,
  } of responseJson) {
    const productName = document.createElement('div');
    productName.classList.add('grid-item');
    productName.classList.add('my-order-name');
    productName.textContent = name;

    const productAmount = document.createElement('div');
    productAmount.classList.add('grid-item');
    productAmount.classList.add('my-order-amount');
    productAmount.textContent = amount;

    const productDate = document.createElement('div');
    productDate.classList.add('grid-item');
    productDate.classList.add('my-order-date');
    productDate.textContent = orderDate;

    const productDeadline = document.createElement('div');
    productDeadline.classList.add('grid-item');
    productDeadline.classList.add('my-order-deadline');
    if (!shipping) productDeadline.textContent = deadlineDate;
    else productDeadline.textContent = 'Shipped';

    myOrdersArea.appendChild(productName);
    myOrdersArea.appendChild(productAmount);
    myOrdersArea.appendChild(productDate);
    myOrdersArea.appendChild(productDeadline);
  }
};

getMyOrders();

myOrders_Btn.addEventListener('click', function () {
  myOrders_Btn.classList.toggle('hidden');
  myOrdersBack_Btn.classList.toggle('hidden');

  resultList.classList.toggle('grid-hide');
  resultList.style.backgroundColor = 'transparent';
  resultList.style.height = 0;
  resultList.style.margin = 0;

  myOrdersArea.classList.toggle('grid-hide');
});

salableBack_Btn.addEventListener('click', function () {
  basket_Btn.classList.toggle('hidden');
  salableBack_Btn.classList.toggle('hidden');

  resultList.classList.toggle('grid-hide');
  resultList.style.backgroundColor = '#a35709';
  resultList.style.height = '40vh';
  resultList.style.margin = '25vh auto';

  document.getElementById('order-button').classList.toggle('hidden');
  listProducts.classList.toggle('grid-hide');
});

myOrdersBack_Btn.addEventListener('click', function () {
  myOrders_Btn.classList.toggle('hidden');
  myOrdersBack_Btn.classList.toggle('hidden');

  resultList.classList.toggle('grid-hide');
  resultList.style.backgroundColor = '#a35709';
  resultList.style.height = '40vh';
  resultList.style.margin = '25vh auto';

  myOrdersArea.classList.toggle('grid-hide');
});
