let myLibrary = [];

const book = {
  init: function(name, author, pages, read) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read
  }
}

function addBookToLibrary(...args) {
  myLibrary.push(...args)
}




const content = document.getElementById('content')
const closeForm = document.getElementById('close')
const formDiv = document.getElementById('form')
const addNewBook = document.getElementById('addBook')
const submitBook = document.getElementById('submitBook')

let i = 0
let readText
submitBook.addEventListener('click', (event) => {
  event.preventDefault()
  const bookTitle = document.getElementById('name').value
  const bookAuthor = document.getElementById('author').value
  const bookPages = document.getElementById('pages').value
  const bookRead = document.getElementById('read').checked

  const newBook = Object.create(book)
  newBook.init(bookTitle, bookAuthor, bookPages, bookRead)
  console.log(bookRead)

  addBookToLibrary(newBook)

  add(newBook)

  formDiv.style.display = 'none'
  content.style.filter = ''
  content.style.zIndex = ''
})

addNewBook.addEventListener('click', () => {
  formDiv.style.display = ''
  content.style.filter = 'blur(5px)'
  content.style.zIndex = '-1'
})

closeForm.addEventListener('click', (event) => {
  event.preventDefault()
  formDiv.style.display = 'none'
  content.style.filter = ''
  content.style.zIndex = ''
})



function add(el) {
  const newbook = document.createElement('div')
  const title = document.createElement('h3')
  const author = document.createElement('div')
  const pages = document.createElement('div') 
  const read = document.createElement('button')
  const remove = document.createElement('button')

  newbook.setAttribute('id', i)
  newbook.setAttribute('class', 'book')
  read.setAttribute('id', 'readBtn')
  remove.setAttribute('id', 'btn')

  if (el.read === false) {
    readText = 'Not read yet'
    read.style.backgroundColor = '#FB475E'
  } else {
    readText = 'Read'
    read.style.backgroundColor = '#AAD6A0'
  }

  read.addEventListener('click', (event) => {
    if (read.textContent === 'Read') {
      read.textContent = 'Not read yet'
      read.style.backgroundColor = '#FB475E'
      el.read = false
    } else { 
      read.textContent = 'Read'
      read.style.backgroundColor = '#AAD6A0'
      el.read = true
    }
  })

  console.log(myLibrary)
  remove.addEventListener('click', (event) => {
    const parentId = event.target.parentElement.id
    const index = myLibrary.indexOf(el)
    myLibrary.splice(index, 1);
    const rm = document.getElementById(parentId)
    content.removeChild(rm)
    console.log(myLibrary)
  })

  title.innerText = el.name
  author.innerText = 'Written by ' + el.author
  pages.innerText = 'Number of pages: ' + el.pages
  read.innerText = readText
  remove.innerText = 'Remove'

  newbook.append(title, author, pages, read, remove)

  content.appendChild(newbook)
  i++; 
}