let myLibrary = [];
const bookLine = document.querySelector("tbody");

function Book(id,title,author,read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(title,author,read) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  const book = new Book(id,title,author,read);
  myLibrary.push(book);
}

function displayBooksOfLibrary(){

    bookLine.innerHTML = "";

    for(let book of myLibrary){
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><input type="checkbox" class="read" ${book.read ? "checked" : ""}></td>
            <td><button class="delete" type="button" data-id="${book.id}">Delete</button></td>`;

        bookLine.appendChild(tr);  
    }  
}

function removeBookOfLibrary(id){
    myLibrary = myLibrary.filter(b => b.id!==id);
    displayBooksOfLibrary();

}

const button = document.querySelector("#addBook");
const formulaire = document.querySelector("#form");
const submit = document.querySelector('#submit');

button.addEventListener("click", () =>{
    formulaire.style.display = "flex";
    button.style.display = "none";
});

submit.addEventListener("click", () =>{
    const titleEntered = document.querySelector("#title").value;
    const authorEntered = document.querySelector("#author").value;
    const readEntered = document.querySelector("#read").checked;

    if(!readEntered || !authorEntered || !titleEntered) {
       console.log("Missing an entry to the form");
        return; 
    }
    addBookToLibrary(titleEntered,authorEntered,readEntered); 
    displayBooksOfLibrary();
});

bookLine.addEventListener("click", (event) =>{
    if(event.target.classList.contains("delete")){
        removeBookOfLibrary(event.target.dataset.id);
    }
});