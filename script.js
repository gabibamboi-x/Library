let myLibrary = [];

// create the book constructor
class Book {
  constructor(name, author, pages, read) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read
  }
}

// add the book to the array
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
  const bookTitle = document.getElementById('name')
  const bookAuthor = document.getElementById('author')
  const bookPages = document.getElementById('pages')
  const bookRead = document.getElementById('read')

  // check Validity
  formDiv.checkValidity()
  formDiv.reportValidity()

  if (formDiv.checkValidity()) {
    // create a new book
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked)

    addBookToLibrary(newBook)

    // show the book on screen
    add(newBook)

    // removing the form from the screen
    formDiv.style.display = 'none'
    content.style.filter = ''
    content.style.zIndex = ''
  }
})

addNewBook.addEventListener('click', () => {
  // show the form and add blur for the rest of the div
  formDiv.style.display = ''
  content.style.filter = 'blur(5px)'
  content.style.zIndex = '-1'
})

// add a closing option in case the user changed his mind
function close() {
  formDiv.style.display = 'none'
  content.style.filter = ''
  content.style.zIndex = ''
}

// event listener to close when clicked
closeForm.addEventListener('click', (event) => {
  event.preventDefault()
  close()
})

// keyboard close support
window.addEventListener('keydown', (event) => {
  const key = event.key
  if (key === 'Escape') {
    close()
  }
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

  // checking wheter the user read the book or not and style the button accordingly 
  if (el.read === false) {
    readText = 'Not read yet'
    read.style.backgroundColor = '#EB1D36'
  } else {
    readText = 'Read'
    read.style.backgroundColor = '#74B72E'
  }

  // add the option to change it's status after adding the book
  read.addEventListener('click', (event) => {
    if (read.textContent === 'Read') {
      read.textContent = 'Not read yet'
      read.style.backgroundColor = '#EB1D36'
      // also update it's status in the array
      el.read = false
    } else { 
      read.textContent = 'Read'
      read.style.backgroundColor = '#74B72E'
      el.read = true
    }
  })

  // remove the book from the library
  remove.addEventListener('click', (event) => {
    // get the id of the parent element
    const parentId = event.target.parentElement.id
    // get the index of the book
    const index = myLibrary.indexOf(el)
    // delete that book from the array
    myLibrary.splice(index, 1);
    const rm = document.getElementById(parentId)
    // delete the div from the page
    content.removeChild(rm)
  })

  // display the details of the book
  title.innerText = el.name
  author.innerText = 'Written by ' + el.author
  pages.innerText = 'Number of pages: ' + el.pages
  read.innerText = readText
  remove.innerText = 'Remove'

  newbook.append(title, author, pages, read, remove)

  content.appendChild(newbook)
  i++;

  // reset the form for the next book
  formDiv.reset()
}
