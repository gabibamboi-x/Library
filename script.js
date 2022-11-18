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
  updateStorage()
}

const content = document.getElementById('content')
const closeForm = document.getElementById('close')
const formDiv = document.getElementById('form')
const addNewBook = document.getElementById('addBook')
const submitBook = document.getElementById('submitBook')

let i = 0
let readText

// validate the form
const bookTitle = document.getElementById('name')
const bookAuthor = document.getElementById('author')
const bookPages = document.getElementById('pages')
const bookRead = document.getElementById('read')

bookTitle.addEventListener('input', () => {
  bookTitle.setCustomValidity('');
  bookTitle.checkValidity();
})

bookAuthor.addEventListener('input', () => {
  bookAuthor.setCustomValidity('');
  bookAuthor.checkValidity();
})

bookPages.addEventListener('input', () => {
  bookPages.setCustomValidity('');
  bookPages.checkValidity();
})

bookTitle.addEventListener('invalid', () => {
  if (bookTitle.value === '') {
    bookTitle.setCustomValidity('Book title is required, darling!')
  }
})

bookAuthor.addEventListener('invalid', () => {
  if (bookAuthor.value === '') {
    bookAuthor.setCustomValidity('Book author is required, darling!')
  }
})

bookPages.addEventListener('invalid', () => {
  if (bookPages.value === '') {
    bookPages.setCustomValidity('Book pages are required, darling!')
  } else {
    bookPages.setCustomValidity('You must enter a number of pages!')
  }
})

// submit the form, prevent the default and add the book
formDiv.onsubmit = (event) => {
  event.preventDefault()

  // create a new book
  const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked)

  addBookToLibrary(newBook)
  // show the book on screen
  add(newBook)
  close()
}

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
closeForm.addEventListener('click', () => {
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

  // checking wether the user read the book or not and style the button accordingly 
  if (el.read === false) {
    readText = 'Not read yet'
    read.style.backgroundColor = '#EB1D36'
  } else {
    readText = 'Read'
    read.style.backgroundColor = '#74B72E'
  }

  // add the option to change it's status after adding the book
  read.addEventListener('click', () => {
    if (read.textContent === 'Read') {
      read.textContent = 'Not read yet'
      read.style.backgroundColor = '#EB1D36'
      // also update it's status in the array
      el.read = false
      updateStorage()
    } else { 
      read.textContent = 'Read'
      read.style.backgroundColor = '#74B72E'
      el.read = true
      updateStorage()
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
    updateStorage()
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

// update the local storage with each new change
function updateStorage() {
  localStorage.clear()
  localStorage.setItem('books', JSON.stringify(myLibrary))
}

// render the books when the page is loaded
const getBooks = JSON.parse(localStorage.getItem('books'));

if (getBooks) {
  // render each book on page
  getBooks.forEach((book) => {
    add(book);
  })

  // push it to the library array
  addBookToLibrary(...getBooks);
}
