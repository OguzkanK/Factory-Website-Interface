const resultList = document.getElementById('results');
let userId = 0;
new URLSearchParams(window.location.search).forEach((value, name) => {
  if (name === 'name')
    document.getElementById(
      'username-holder'
    ).textContent = `Hoşgeldiniz, Sayın ${value}`;
  else userId = value;
});

const listAllOrders_Btn = document.getElementById('list-allOrders');
const backAllOrders_Btn = document.getElementById('back-from-allOrders');
const allOrders_Area = document.getElementById('all-orders');

const getAllOrders = function () {
  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let responseJson = JSON.parse(this.responseText);
      fillAllOrders(responseJson);
    }
  };
  xhttpGet.open('GET', 'http://localhost:8080/GET/orders/allOrders', true);
  xhttpGet.send();
};

const fillAllOrders = function (responseJson) {
  let allOrdersHeight = 0;
  let templateRows = '75px';
  const allOrdersTemplateRows = [];
  for (const entry of responseJson) {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('grid-item');
    entryDiv.classList.add('entry-div');

    for (let i = entry.length - 1; i > -1; i--) {
      if (i === entry.length - 1) {
        const customersName = document.createElement('div');
        customersName.classList.add('grid-item');
        customersName.classList.add('customer-name');
        customersName.textContent = entry[i].customerName;

        const orderDate = document.createElement('div');
        orderDate.classList.add('grid-item');
        orderDate.classList.add('order-date');
        orderDate.textContent = entry[i].orderDate;

        const shipping = document.createElement('div');
        shipping.classList.add('grid-item');
        shipping.classList.add('order-shipping');
        if (!entry[i].shipping) shipping.textContent = entry[i].deadlineDate;
        else shipping.textContent = 'Shipped';

        entryDiv.appendChild(customersName);
        entryDiv.appendChild(orderDate);
        entryDiv.appendChild(shipping);
      } else {
        const productName = document.createElement('div');
        productName.classList.add('grid-item');
        productName.classList.add('product-name');
        productName.textContent = entry[i].productName;
        console.log(entry[i].productName);

        const productAmount = document.createElement('div');
        productAmount.classList.add('grid-item');
        productAmount.classList.add('product-amount');
        productAmount.textContent = entry[i].amount;

        entryDiv.appendChild(productName);
        entryDiv.appendChild(productAmount);
        entryDiv.appendChild(document.createElement('div'));
        templateRows += ` 75px`;
      }
    }
    allOrdersTemplateRows.push(
      `${entry.length * 75 + (entry.length + 1) * 10 + 300}`
    );
    entryDiv.style.gridTemplateRows = templateRows;
    templateRows = ' 75px';
    allOrders_Area.appendChild(entryDiv);
    allOrdersHeight += entry.length * 75 + (entry.length + 1) * 10 + 300;
  }
  templateRows = '';
  for (const rows of allOrdersTemplateRows) templateRows += `${rows}px `;
  console.log(templateRows);
  allOrders_Area.style.gridTemplateRows = templateRows;
  allOrders_Area.style.height = `${allOrdersHeight}px`;
};

getAllOrders();

listAllOrders_Btn.addEventListener('click', function () {
  listAllOrders_Btn.classList.toggle('hidden');
  backAllOrders_Btn.classList.toggle('hidden');

  resultList.classList.toggle('grid-hide');
  resultList.style.backgroundColor = 'transparent';
  resultList.style.height = 0;
  resultList.style.margin = 0;

  allOrders_Area.classList.toggle('grid-hide');
});

backAllOrders_Btn.addEventListener('click', function () {
  listAllOrders_Btn.classList.toggle('hidden');
  backAllOrders_Btn.classList.toggle('hidden');

  resultList.classList.toggle('grid-hide');
  resultList.style.backgroundColor = '#a35709';
  resultList.style.height = '40vh';
  resultList.style.margin = '25vh auto';

  allOrders_Area.classList.toggle('grid-hide');
});
