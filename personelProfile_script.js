const resultList = document.getElementById("results");
let userId = 0;
new URLSearchParams(window.location.search).forEach((value, name) => {
  if (name === "name")
    document.getElementById(
      "username-holder"
    ).textContent = `Hoşgeldiniz, Sayın ${value}`;
  else userId = value;
});

const listAllOrders_Btn = document.getElementById("list-allOrders");
const backAllOrders_Btn = document.getElementById("back-from-allOrders");
const listAllMachines_Btn = document.getElementById("list-allMachines");
const backAllMachines_Btn = document.getElementById("back-from-allMachines");
const listAllItems_Btn = document.getElementById("list-allItems");
const backAllItems_Btn = document.getElementById("back-from-allItems");
const allOrders_Area = document.getElementById("all-orders");
const allMachines_Area = document.getElementById("all-machines");
const allItems_Area = document.getElementById("all-items");

let allOrdersHeight = 0;
let allMachinesHeight = 0;
let allItemsHeight = 0;

const getAllOrders = function () {
  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let responseJson = JSON.parse(this.responseText);
      fillAllOrders(responseJson);
    }
  };
  xhttpGet.open("GET", "http://localhost:8080/GET/orders/allOrders", true);
  xhttpGet.send();
};

const fillAllOrders = function (responseJson) {
  let templateRows = "75px";
  const allOrdersTemplateRows = [];
  for (const entry of responseJson) {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("grid-item");
    entryDiv.classList.add("entry-div");

    for (let i = entry.length - 1; i > -1; i--) {
      if (i === entry.length - 1) {
        const customersName = document.createElement("div");
        customersName.classList.add("grid-item");
        customersName.textContent = entry[i].customerName;

        const orderDate = document.createElement("div");
        orderDate.classList.add("grid-item");
        orderDate.textContent = entry[i].orderDate;

        const shipping = document.createElement("div");
        shipping.classList.add("grid-item");
        if (!entry[i].shipping) shipping.textContent = entry[i].deadlineDate;
        else shipping.textContent = "Shipped";

        entryDiv.appendChild(customersName);
        entryDiv.appendChild(orderDate);
        entryDiv.appendChild(shipping);
      } else {
        const productName = document.createElement("div");
        productName.classList.add("grid-item");
        productName.textContent = entry[i].productName;

        const productAmount = document.createElement("div");
        productAmount.classList.add("grid-item");
        productAmount.textContent = entry[i].amount;

        entryDiv.appendChild(productName);
        entryDiv.appendChild(productAmount);
        entryDiv.appendChild(document.createElement("div"));
        templateRows += ` 75px`;
      }
    }
    allOrdersTemplateRows.push(
      `${entry.length * 75 + (entry.length + 1) * 10 + 300}`
    );
    entryDiv.style.gridTemplateRows = templateRows;
    templateRows = " 75px";
    allOrders_Area.appendChild(entryDiv);
    allOrdersHeight += entry.length * 75 + (entry.length + 1) * 10 + 300;
  }
  templateRows = "";
  for (const rows of allOrdersTemplateRows) templateRows += `${rows}px `;
  allOrders_Area.style.gridTemplateRows = templateRows;
};

const getAllOperations = function () {
  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let responseJson = JSON.parse(this.responseText);
      fillMachineList(responseJson);
    }
  };
  xhttpGet.open("GET", "http://localhost:8080/GET/orders/allOperations", true);
  xhttpGet.send();
};

const fillMachineList = function (responseJson) {
  let varTime = 0;
  let templateRows = "75px";
  const allMachinesTemplateRows = [];
  for (const entry of responseJson) {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("grid-item");
    entryDiv.classList.add("entry-div");
    const completeTime = document.createElement("div");

    for (let i = entry.length - 1; i > -1; i--) {
      if (i === entry.length - 1) {
        completeTime.classList.add("grid-item");
        varTime = entry[i].completeTime;
        completeTime.textContent = varTime;

        entryDiv.appendChild(completeTime);
        entryDiv.appendChild(document.createElement("div"));
        entryDiv.appendChild(document.createElement("div"));
      } else {
        if (Object.keys(entry[i]).length % 2 === 1) {
          const wcName = document.createElement("div");
          wcName.classList.add("grid-item");
          wcName.textContent = entry[i].workcenterName;

          const optName = document.createElement("div");
          optName.classList.add("grid-item");
          optName.textContent = entry[i].operationName;

          const workTime = document.createElement("div");
          workTime.classList.add("grid-item");
          workTime.textContent = entry[i].workTime;

          entryDiv.appendChild(wcName);
          entryDiv.appendChild(optName);
          entryDiv.appendChild(workTime);
          templateRows += ` 75px`;

          if (entry[i].workTime === "-")
            completeTime.textContent = varTime + ", Dolu makineler var";
        } else {
          const spAmount = document.createElement("div");
          spAmount.classList.add("grid-item");
          spAmount.textContent = entry[i].subproductAmount;

          const spName = document.createElement("div");
          spName.classList.add("grid-item");
          spName.textContent = entry[i].subproductName;

          entryDiv.appendChild(spName);
          entryDiv.appendChild(spAmount);
          entryDiv.appendChild(document.createElement("div"));
          templateRows += ` 75px`;
        }
      }
    }
    allMachinesTemplateRows.push(
      `${entry.length * 75 + (entry.length + 1) * 20 + 400}`
    );
    entryDiv.style.gridTemplateRows = templateRows;
    templateRows = " 75px";
    allMachines_Area.appendChild(entryDiv);
    allMachinesHeight += entry.length * 75 + (entry.length + 1) * 20 + 390;
  }
  templateRows = "";
  for (const rows of allMachinesTemplateRows) templateRows += `${rows}px `;
  allMachines_Area.style.gridTemplateRows = templateRows;
};

const getAllItems = function () {
  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let responseJson = JSON.parse(this.responseText);
      fillItemList(responseJson);
    }
  };
  xhttpGet.open("GET", "http://localhost:8080/GET/orders/allRelations", true);
  xhttpGet.send();
};

const fillItemList = function (responseJson) {
  let templateRows = "75px";
  const allItemsTemplateRows = [];
  for (const entry of responseJson) {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("grid-item");
    entryDiv.classList.add("entry-div");
    for (const [i, object] of entry.entries()) {
      if (i === 0) {
        const productName = document.createElement("div");
        productName.classList.add("grid-item");
        productName.textContent = object.productName;

        const productType = document.createElement("div");
        productType.classList.add("grid-item");
        productType.textContent = object.productType;

        const salable = document.createElement("div");
        salable.classList.add("grid-item");
        salable.textContent = object.salable;
        entryDiv.appendChild(productName);
        entryDiv.appendChild(productType);
        entryDiv.appendChild(salable);
      } else {
        if (Object.keys(object).length % 2 === 1) {
          const wcName = document.createElement("div");
          wcName.classList.add("grid-item");
          wcName.textContent = object.workcenterName;

          const optName = document.createElement("div");
          optName.classList.add("grid-item");
          optName.textContent = object.operationName;

          const workTime = document.createElement("div");
          workTime.classList.add("grid-item");
          workTime.textContent = object.workTime;

          entryDiv.appendChild(wcName);
          entryDiv.appendChild(optName);
          entryDiv.appendChild(workTime);
          templateRows += ` 75px`;
        } else {
          const spAmount = document.createElement("div");
          spAmount.classList.add("grid-item");
          spAmount.textContent = object.subProductAmount;

          const spName = document.createElement("div");
          spName.classList.add("grid-item");
          spName.textContent = object.subProductName;

          entryDiv.appendChild(spName);
          entryDiv.appendChild(spAmount);
          entryDiv.appendChild(document.createElement("div"));
          templateRows += ` 75px`;
        }
      }
    }
    allItemsTemplateRows.push(
      `${entry.length * 75 + (entry.length + 1) * 20 + 400}`
    );
    entryDiv.style.gridTemplateRows = templateRows;
    templateRows = " 75px";
    allItems_Area.appendChild(entryDiv);
    allItemsHeight += entry.length * 75 + (entry.length + 1) * 20 + 390;
  }
  templateRows = "";
  for (const rows of allItemsTemplateRows) templateRows += `${rows}px `;
  allItems_Area.style.gridTemplateRows = templateRows;
};

getAllItems();
getAllOperations();
getAllOrders();

const backToProfile = function (targetArea, targetBtn, targetBack) {
  targetBtn.classList.toggle("hidden");
  targetBack.classList.toggle("hidden");

  resultList.classList.toggle("grid-hide");
  resultList.style.backgroundColor = "#a35709";
  resultList.style.height = "55vh";
  resultList.style.margin = "25vh auto";

  targetArea.classList.toggle("grid-hide");
  targetArea.style.height = `0px`;
  targetArea.style.margin = `0`;
};

const LeaveProfile = function (
  targetArea,
  targetBtn,
  targetBack,
  targetHeight
) {
  targetBtn.classList.toggle("hidden");
  targetBack.classList.toggle("hidden");

  resultList.classList.toggle("grid-hide");
  resultList.style.backgroundColor = "transparent";
  resultList.style.height = 0;
  resultList.style.margin = 0;

  targetArea.classList.toggle("grid-hide");
  targetArea.style.height = `${targetHeight}px`;
  targetArea.style.margin = `auto`;
  targetArea.style.marginTop = `5vh`;
};

listAllOrders_Btn.addEventListener("click", function () {
  LeaveProfile(
    allOrders_Area,
    listAllOrders_Btn,
    backAllOrders_Btn,
    allOrdersHeight
  );
});

listAllMachines_Btn.addEventListener("click", function () {
  LeaveProfile(
    allMachines_Area,
    listAllMachines_Btn,
    backAllMachines_Btn,
    allMachinesHeight
  );
});

listAllItems_Btn.addEventListener("click", function () {
  LeaveProfile(
    allItems_Area,
    listAllItems_Btn,
    backAllItems_Btn,
    allItemsHeight
  );
});

backAllOrders_Btn.addEventListener("click", function () {
  backToProfile(allOrders_Area, listAllOrders_Btn, backAllOrders_Btn);
});

backAllMachines_Btn.addEventListener("click", function () {
  backToProfile(allMachines_Area, listAllMachines_Btn, backAllMachines_Btn);
});

backAllItems_Btn.addEventListener("click", function () {
  backToProfile(allItems_Area, listAllItems_Btn, backAllItems_Btn);
});
