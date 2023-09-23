let addBtn = document.getElementById('addBookBtn');
let addBook = document.getElementById('addBook');
let bookIdForm = document.getElementById('bookIdForm');
let overlay = document.getElementById('overlay')
let submitBtn = document.querySelector(".submitBtn");
let readBtn = document.getElementById('readBtn');
let removeBtn = document.querySelector(".remove");
let head = document.querySelector(".header");
const OpenaddBookModal = () => {
    bookIdForm.reset();
    addBook.classList.add("active");
    overlay.classList.add("active");
}

const closeaddBookModal = () => {
    addBook.classList.remove("active");
    overlay.classList.remove("active");
    head.classList.remove('z-index');
}
// const closeAllmodal =()=>{
//     closeaddBookModal;
// }
addBtn.addEventListener("click",()=>{
    OpenaddBookModal();
    head.classList.add('z-index');
});
overlay.onclick = closeaddBookModal;



let library = [];
// {title : 'Game of Thrones', author : 'Rk Narayan', pages : '23', file : 'file', index : 0, makeUnread: true},
//                 {title : 'Spider Man', author : 'Jems Bond',pages : '22', file : 'file', index : 1, makeUnread: false}
console.log(library);

showBooks();
function showBooks(){
    
    let bookS = '';
    let libraryLst = JSON.parse(localStorage.getItem('libraryList'));
    console.log(libraryLst);
     if(libraryLst.length !== 0){
        library = [];
        for(let j =0; j<libraryLst.length; j++){
            library.push(libraryLst[j]);
        }
    }
    for(let i = 0; i<library.length; i++){
        const items = library[i];
        const html = 
        `
            <div class="Bookcontainer">
                <div>
                    <img src="./2x/Monkey.png" alt="" style="width:100%;">
                </div>
                <p><strong>Title :</strong> "${items.title}"</p>
                <p><Strong>Author :</Strong> ${items.author}</p>
                <p><Strong>Pages :</Strong> ${items.pages} <a class="viewBook" href="">View Book</a></p>
                
                <button class="read" onclick="
                 if(this.innerHTML === 'Read'){
                    this.innerHTML = 'Unread';
                    this.classList.add('unread');
                 }
                 else{
                    this.innerHTML = 'Read';
                    this.classList.remove('unread');
                 }
                ">Read</button>
                <button class="remove" onclick = " 
                 removeBook(${i});
                 showBooks();
                ">Remove</button>
            </div> 
        `;
        bookS += html;
    }
    document.querySelector(".main .bookDetail").innerHTML = bookS;
}
function addBooklibray(){
   const title = document.getElementById("title");
   const author = document.getElementById("author");
   const pages = document.getElementById("pages");
   const myFile = document.getElementById("myFile");
   const readElm = document.querySelector(".mrk .mrkRead");
   const libraryElm = {
        title : title.value,
        author: author.value,
        pages : pages.value,
        file  : myFile.value,
        makeUnread  : readElm.checked
   }
   library.push(libraryElm);
   let libraryX = JSON.stringify(library);
   localStorage.setItem('libraryList',libraryX);
   console.log(library.length);

   showBooks();
}

submitBtn.addEventListener("click",(event)=>{
    if(document.getElementById("title").value!== '' && document.getElementById("author").value!=='' && document.getElementById("pages").value !==''){
        addBooklibray();
        event.preventDefault();
        closeaddBookModal();
    }
});
function removeBook(event){
    library.splice(event,1);
}
function markUnread(){
    let unread = document.querySelector(".mrk .mrkRead");
    if(unread.checked == true){
        document.querySelector(".markRead").textContent = 'Already read';
    }
    else if(unread.checked == false){
        document.querySelector(".markRead").textContent = 'Mark as read';
    }
}
function readButton(){
    for(let event = 0; event<library.length; event++){
        let it = library[event];
        let colorRed = document.querySelector(".read");
        if(it.makeUnread == true){
            colorRed.innerHTML= 'Read';
            colorRed.classList.remove('unread');
        }
        if(it.makeUnread == false){
            colorRed.innerHTML='Unread';
            colorRed.classList.add('unread');
        }
        console.log(colorRed.innerHTML);
    }
}
console.log(libraryCode);
