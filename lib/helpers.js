export function createPizza(items, currentTarget) {
  const title = currentTarget.title.value
  const price = currentTarget.price.value
  const image = currentTarget.image.value
  const description = currentTarget.description.value
  
  if (!title || !price || !image || !description) return
  
  const item = {
    title,
    price,
    image,
    description,
    selected: false,
    id: Date.now()
  }
  return [...items, item]
}

export function remove(id, items) {
  return items.filter(pizza => pizza.id !== id)
}

export function markAsSelected(id, items) {
  const item = items.find(pizza => pizza.id === id)
  const curIndex = items.findIndex(pizza => pizza.id === id)
  
  const itemUpdated = {
    ...item,
    selected: !item.selected
  }
  
  return [
    ...items.slice(0, curIndex),
    itemUpdated,
    ...items.slice(curIndex + 1)
  ]
}

export function edit(eTarget, items) {
  const id = +eTarget.id
  const title = eTarget.title.value
  const price = eTarget.price.value
  const image = eTarget.image.value
  const description = eTarget.description.value
  if (!title || !price || !image || !description) return
  
  const item = items.find(p => id === p.id)
  const curIndex = items.findIndex(p => id === p.id)
  
  const itemUpdated = {
    ...item,
    title,
    price,
    image,
    description
  }
  
  return [
    ...items.slice(0, curIndex),
    itemUpdated,
    ...items.slice(curIndex + 1)
  ]
}

export function CheckAllBtn(items) {
  let checkedPizzas = 0
  let itemsChecked = []
  
  items.forEach(p => {
    if (p.selected) {
      checkedPizzas += 1
    }
  });
  
  if (checkedPizzas === items.length) {
    itemsChecked = items.map(p => {
      return {
        ...p,
        selected: false
      }
    })
  } else {
    itemsChecked = items.map(p => {
      return {
        ...p,
        selected: true
      }
    })
  }
  return itemsChecked
}