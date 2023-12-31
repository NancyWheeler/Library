const myLibrary = [];
const btn = document.querySelector('.toggle');
const confirm = document.getElementById('add');
const dialogs = document.querySelectorAll('dialog');
const dialog = dialogs[1];
const container = document.getElementById('grid-content');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author; 
    this.pages = pages; 
    this.read = read;
  }
}

// Create cards for library
function DisplayBooks (books) {
    index =  myLibrary.length - 1;
    books.forEach((element) => {
        let grid = document.getElementById("grid-content");

        let bookItem = document.createElement("div");
        bookItem.classList.add("item");
        bookItem.setAttribute("id", index);

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
        bookStatus.classList.add("read");
        bookStatus.innerText = element.read;

        let toggleRead = document.createElement("button");
        toggleRead.setAttribute("id", index);
        toggleRead.classList.add("toggle-read");
        toggleRead.textContent = "Read";

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", index);
        deleteButton.classList.add("remove");
        deleteButton.textContent = "Remove";

        bookItem.appendChild(row1);
        bookItem.appendChild(bookName);
        bookItem.appendChild(row2);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(row3);
        bookItem.appendChild(bookPages);
        bookItem.appendChild(row4);
        bookItem.appendChild(bookStatus);
        bookItem.appendChild(toggleRead);
        bookItem.appendChild(deleteButton);        

        grid.appendChild(bookItem);
    });
}

btn.addEventListener("click", () => {
  dialog.showModal();
});

// Add new book
confirm.addEventListener("click", (event) => {
  event.preventDefault();

  // Get form data
  const formData = new FormData(document.querySelector('form'));
  const name = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  let read = formData.get("read");
  const alert = dialogs[0];
  let message = document.getElementsByClassName("message")[0];
  const isEmpty = str => !str.trim().length;

  // Create book if form fields are filled
  if (isEmpty(name) || isEmpty(author) || isEmpty(pages)) {
    message.textContent = "Please fill in all the fields";
    message.setAttribute("style", "color: red");
    alert.showModal();
    dialog.close();
  } else {
    read === null ? read = "No" : read = "Yes"; 
    myLibrary.push(new Book(name, author, pages, read));
    DisplayBooks(myLibrary.slice(-1));

    message.textContent = "Book has been successfully added!";
    message.setAttribute("style", "color: lime");
    alert.showModal();
    
    dialog.close();
  }
});

// Allow user to click area out of bounds to close dialog
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
  });
});

// Handle removal of books and toggling read status
container.addEventListener("click", e => {
  let id = parseInt(e.target.id);
  let cards = document.querySelectorAll('.item');
  let rmvBtns = document.querySelectorAll('.remove');
  let tglReadBtns = document.querySelectorAll('.toggle-read');

  if (e.target.classList.contains("remove")) {
    myLibrary.splice(id, 1);
    cards[id].remove();

    for (let i = id+1; i < rmvBtns.length; i++) {
      cards[i].setAttribute("id", i-1);
      rmvBtns[i].setAttribute("id", i-1);
      tglReadBtns[i].setAttribute("id", i-1);
    }
  } else if (e.target.classList.contains("toggle-read")) {
    myLibrary[id].read === "Yes" ? myLibrary[id].read = "No" : myLibrary[id].read = "Yes";
    cards[id].getElementsByClassName("read")[0].textContent = myLibrary[id].read;
  }
});

// Placeholder books
// myLibrary.push(new Book("The Alchemist", "Paulo Coelho", 400, "Yes"));
// DisplayBooks(myLibrary.slice(-1));
// myLibrary.push(new Book("Meditations", "Marcus Aurelius", 400, "No"));
// DisplayBooks(myLibrary.slice(-1));
// myLibrary.push(new Book("lorem ipsum", "lorem ipsum", 200, "Yes"));
// DisplayBooks(myLibrary.slice(-1));
// myLibrary.push(new Book("dolor sit", "lorem ipsum", 300, "No"));
// DisplayBooks(myLibrary.slice(-1));
// myLibrary.push(new Book("amet", "lorem ipsum", 100, "Yes"));
// DisplayBooks(myLibrary.slice(-1));