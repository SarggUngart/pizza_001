function formHTML (items){
  return items.map(item => {
    return (
      `
      <form class="edit-pizza-form" autocomplete="off" id="${item.id}" >
       <input type="text" name="title" value="${item.title}" placeholder="Title">
       <input type="text" name="price" value="${item.price}" placeholder="Price">
       <input type="text" name="image" value="${item.image}" placeholder="Image">
       <input type="text" name="description" value="${item.description}" placeholder="Description">
       <button type="submit">+ Edit</button>>
      </form>
      `
    )
  }).join('')
}

export default formHTML