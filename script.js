const myLibrary = [];

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
    for(let book of myLibrary){
        console.log(`The ID : ${book.id}
        The title : ${book.title}
        The author : ${book.author}
        Have you read this book : ${book.read ? "Yes I have" : "No, I haven't"}`);
    }
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

        if(!readEntered || !authorEntered || !readEntered) {
           console.log("Missing an entry to the form");
            return; 
        }
        addBookToLibrary(titleEntered,authorEntered,readEntered.value); 
        displayBooksOfLibrary();
})

displayBooksOfLibrary();