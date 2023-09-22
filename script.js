const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author; 
    this.pages = pages;

    read ? read = "Yes" : read = "No"; 
    this.read = read;
}

function addBookToLibrary() {
    title = prompt("Name of book: ");
    author = prompt("Author of book: ");
    pages = prompt("Number of pages: ");
    read = prompt("Have you read the book (y/n): ");

    myLibrary.push(new Book(title, author, pages, read));
}

function DisplayBooks (books) {
    books.forEach((element, index) => {
        let grid = document.getElementById("grid-content");

        let bookItem = document.createElement("div");
        bookItem.classList.add("item");
        bookItem.setAttribute("id", index + 1);

        let row1 = document.createElement("h4");
        row1.innerText = "Name";
        let row2 = document.createElement("h4");
        row2.innerText = "Author";
        let row3 = document.createElement("h4");
        row3.innerText = "Pages";
        let row4 = document.createElement("h4");
        row4.innerText = "Read";

        let bookName = document.createElement("p");
        bookName.innerText = element.title;
        let bookAuthor = document.createElement("p");
        bookAuthor.innerText = element.author;
        let bookPages = document.createElement("p");
        bookPages.innerText = element.pages;
        let bookStatus = document.createElement("p");
        bookStatus.innerText = element.read;

        bookItem.appendChild(row1);
        bookItem.appendChild(bookName);
        bookItem.appendChild(row2);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(row3);
        bookItem.appendChild(bookPages);
        bookItem.appendChild(row4);
        bookItem.appendChild(bookStatus);

        grid.appendChild(bookItem);
    });
}

const btn = document.querySelector('.toggle');
const confirm = document.getElementById('add');
const dialogs = document.querySelectorAll('dialog');
const dialog = dialogs[1];//document.getElementById('add-book');

btn.addEventListener("click", () => {
  dialog.showModal();
});

confirm.addEventListener("click", (event) => {
  event.preventDefault();

  let form = document.querySelector('.form');
  let name = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let read = document.getElementById('read');
  let message = document.getElementsByClassName("message")[0];
  let alert = dialogs[0];
  const isEmpty = str => !str.trim().length;

  if (isEmpty(name.value) || isEmpty(author.value) || isEmpty(pages.value)) {
    message.textContent = "Please fill in all the fields";
    message.setAttribute("style", "color: red");
    alert.showModal();
    dialog.close();
  } else {
    myLibrary.push(new Book(name.value, author.value, pages.value, read.checked));
    DisplayBooks(myLibrary.slice(-1)); 

    message.textContent = "Book has been successfully added!";
    message.setAttribute("style", "color: lime");
    alert.showModal();

    // use form element to get data
    
    dialog.close();
  }
});

dialogs.forEach( (element) => {
  element.addEventListener("click", e => {
    const dialogDimensions = element.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      element.close()
    }
  })
});

myLibrary.push(new Book("The Alchemist", "Paulo Coelho", 400, true));
myLibrary.push(new Book("Meditations", "Marcus Aurelius", 400, true));
myLibrary.push(new Book("lorem ipsum", "lorem ipsum", 200, true));
myLibrary.push(new Book("lorem ipsum", "lorem ipsum", 300, false));
myLibrary.push(new Book("lorem ipsum", "lorem ipsum", 100, true));
DisplayBooks(myLibrary);
