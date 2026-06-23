let myLibrary = [];
const bookLine = document.querySelector("tbody");
const button = document.querySelector("#addBook");
const formulaire = document.querySelector("#form");
const submit = document.querySelector('#submit');
const cancel = document.querySelector("#cancel");

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
        tr.dataset.id = book.id;

        tr.innerHTML = `
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

function toggleReadStatus(id,newStatus){
    const book = myLibrary.find(b => b.id===id)
    book.read=newStatus;
}

/* __________ Button events ______________*/ 

button.addEventListener("click", () =>{
    formulaire.showModal();
    button.style.display = "none";
});

submit.addEventListener("click", () =>{
    const titleEntered = document.querySelector("#title").value;
    const authorEntered = document.querySelector("#author").value;
    const readEntered = document.querySelector("#read").checked;

    if(!authorEntered || !titleEntered) {
       console.log("Missing an entry to the form");
        return; 
    }
    addBookToLibrary(titleEntered,authorEntered,readEntered); 
    displayBooksOfLibrary();
    console.log("About to close");
    formulaire.close();
    button.style.display = "block";
});

bookLine.addEventListener("click", (event) =>{
    if(event.target.classList.contains("delete")){
        removeBookOfLibrary(event.target.dataset.id);
    }

    if(event.target.classList.contains("read")){
        const id = event.target.closest("tr").dataset.id;
        toggleReadStatus(id, event.target.checked);
    }
});

cancel.addEventListener("click", () => {
    formulaire.close();
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#read").checked = false;
    button.style.display = "block";
});
