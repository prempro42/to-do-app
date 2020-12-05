const listArrayString = localStorage.getItem("listArray")

if (listArrayString == null) {
  // visting app for first time, init empty array
  const listArray = []
  localStorage.setItem("listArray", JSON.stringify(listArray))
} else {
  // getting the to-do values from localstorage to display
  const listArrayString = localStorage.getItem("listArray")
  const listArray = JSON.parse(listArrayString)

  //appending to do values to ui
  for (var item in listArray) {
    const liTagHTML = addListItem(listArray[item])
    document.getElementById("liParent").insertAdjacentHTML("beforeend", liTagHTML)
  }
}

function addItem() {
  const itemInput = document.getElementById("itemInput")
  const liTagHTML = addListItem(itemInput.value)
  document.getElementById("liParent").insertAdjacentHTML("beforeend", liTagHTML)

  // //storing new added item to local storage
  const listArrayString = localStorage.getItem("listArray")
  const listArray = JSON.parse(listArrayString)
  listArray.push(itemInput.value)
  localStorage.setItem("listArray", JSON.stringify(listArray))

  itemInput.value = ""
  itemInput.focus()
}

function addListItem(item) {
  return `<li class="p-0 list-group-item space-list">
      <input type="checkbox" onclick="itemDone(this)" class="mx-2" aria-label="finish task" />${item}
      <button class="btn btn-outline-danger m-1" onclick="deleteItem(this)" type="button">
        <img class="c-btn" src="close.svg" alt="close button" />
      </button>
    </li>`
}

function deleteItem(e) {
  const deleteItem = e.parentElement.innerText

  const listArrayString = localStorage.getItem("listArray")
  const listArray = JSON.parse(listArrayString)
  const index = listArray.indexOf(deleteItem)

  if (index > -1) {
    listArray.splice(index, 1)
    console.log("deleted")
  }

  localStorage.setItem("listArray", JSON.stringify(listArray))
  e.parentElement.remove()
}

function itemDone(e) {
  const liClassNames = e.parentElement.attributes.class
  const isDone = liClassNames.nodeValue.includes("text-lt")
  // console.log(isDone)
  if (!isDone) {
    liClassNames.nodeValue = liClassNames.nodeValue + " text-lt"
  } else {
    liClassNames.nodeValue = "p-0 list-group-item space-list"
  }
}
