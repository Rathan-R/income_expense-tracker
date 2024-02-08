let income = document.querySelector(".in");
let expense = document.querySelector(".ex");
let total = document.querySelector(".balance");
const description = document.getElementById("description");
const form = document.getElementById("form");
const amount = document.getElementById("amount");
const addBtn = document.querySelector(".addTrans");
const trans = document.querySelector(".trans");

// const dummydata = [
//   { id: 1, description: "flower", amount: -20 },
//   { id: 2, description: "salary", amount: 300 },
//   { id: 3, description: "Book", amount: -20 },
//   { id: 4, description: "camera", amount: 200 },
// ];

// let transaction = dummydata;

const localStorageTrans = JSON.parse(localStorage.getItem("exp_inc"));

let transaction =
  localStorage.getItem("exp_inc") !== null ? localStorageTrans : [];

function loadTransaction(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "exp" : "inc");

  item.innerHTML = `${transaction.description} <span>${sign}${Math.abs(
    transaction.amount
  )}
  </span> <button class="btn-del" onclick='deleteData(${
    transaction.id
  })'>x</button>`;

  trans.appendChild(item);
}
var tot;
function updateData() {
  const amounts = transaction.map((tra) => tra.amount);

  const tot = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  total.innerHTML = `₹ ${tot}`;

  const inc = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  income.innerText = `₹ ${inc}`;

  const exp = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  expense.innerText = `₹ ${Math.abs(exp)}`;
}

function deleteData(id) {
  if (confirm("Are You want to delete")) {
    transaction = transaction.filter((tra) => tra.id != id);

    updateLocalStorage();
    config();
  } else {
    return;
  }
}

function config() {
  trans.innerHTML = "";
  transaction.forEach(loadTransaction);
  updateData();
}

function addElement(e) {
  e.preventDefault();
  if (description.value.trim() == "" && amount.value.trim() == "") {
    alert("Please enter description and amount");
  } else {
    const data = {
      id: uniqueId(),
      description: description.value,
      amount: +amount.value,
    };
    transaction.push(data);

    loadTransaction(data);

    description.value = "";
    amount.value = "";
    updateData();
    updateLocalStorage();
  }
}
function uniqueId() {
  return Math.floor(Math.random() * 100000);
}

function updateLocalStorage() {
  localStorage.setItem("exp_inc", JSON.stringify(transaction));
}

form.addEventListener("submit", addElement);
window.addEventListener("load", () => {
  config();
});
