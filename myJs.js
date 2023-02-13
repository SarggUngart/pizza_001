import {list, addPizzaForm, btnCheck, formsList} from "./lib/elements.js"
import {
  createPizza,
  remove,
  markAsSelected,
  edit,
  CheckAllBtn
} from "./lib/helpers.js";
import cardHTML from "./lib/card.js";
import formHTML from "./lib/form.js";

let items = [];

function handleSubmit(e) {
  e.preventDefault()
  const newItems = createPizza(e.currentTarget, items)
  items = newItems
  e.currentTarget.reset()
  list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

function displayFormItems() {
  formsList.innerHTML = formHTML(items)
}

function displayItems() {
  list.innerHTML = cardHTML(items)
}

function saveToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items))
}

function getFromLocalStorage() {
  const getDataFromLocalStorage = JSON.parse(localStorage.getItem('items'))
  if (getDataFromLocalStorage && getDataFromLocalStorage.length) {
    items.push(...getDataFromLocalStorage)
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
  }
}

addPizzaForm.addEventListener('submit', handleSubmit)
list.addEventListener('itemsUpdated', displayItems)
list.addEventListener('itemsUpdated', displayFormItems)
list.addEventListener('itemsUpdated', saveToLocalStorage)
list.addEventListener('click', function (e) {
  const id = +e.target.value
  if (e.target.matches('button')) {
    const newItems = remove(id, items)
    items = newItems
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
  }
  if (e.target.matches('input[type="checkbox"]')) {
    const newItems = markAsSelected(id, items)
    items = newItems
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
  }
})

formsList.addEventListener('submit', function (e) {
  e.preventDefault()
  const itemsUpdated = edit(e.target, items)
  items = itemsUpdated
  list.dispatchEvent(new CustomEvent('itemsUpdated'))
})

getFromLocalStorage()

btnCheck.addEventListener('click', function () {
  const itemsChecked = CheckAllBtn(items)
  items = itemsChecked
  list.dispatchEvent(new CustomEvent('itemsUpdated'))
})