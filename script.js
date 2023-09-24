let addBtn = document.getElementById('addBookBtn')
let addBook = document.getElementById('addBook')
let bookIdForm = document.getElementById('bookIdForm')
let overlay = document.getElementById('overlay')
let submitBtn = document.querySelector(".submitBtn")
let readBtn = document.getElementById('readBtn')
let removeBtn = document.querySelector(".remove")
let head = document.querySelector(".header")
const OpenaddBookModal = () => {
    bookIdForm.reset();
    addBook.classList.add("active")
    overlay.classList.add("active")
}

const closeaddBookModal = () => {
    addBook.classList.remove("active")
    overlay.classList.remove("active")
    head.classList.remove('z-index')
}
// const closeAllmodal =()=>{
//     closeaddBookModal;
// }
addBtn.addEventListener("click",()=>{
    OpenaddBookModal()
    head.classList.add('z-index')
})
overlay.onclick = closeaddBookModal

let library = []
 
// {title : 'Game of Thrones', author : 'Rk Narayan', pages : '23', file : 'file', index : 0, makeUnread: true},
//                 {title : 'Spider Man', author : 'Jems Bond',pages : '22', file : 'file', index : 1, makeUnread: false}

console.log(library)
const saveLocal = () => {
    localStorage.setItem('libraryList', JSON.stringify(library))
}
function showLibrary(){
    let libraryLst = JSON.parse(localStorage.getItem('libraryList'))
    if(libraryLst){
        library = []
        for(let j in libraryLst){
            library.push(libraryLst[j])
        }
    }
}
showBooks()
function showBooks(){
    showLibrary()
    let bookS = ''
    for(let i  in library){
        const items = library[i]
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
                 removeBook(${i})
                 displayUndoBtn()
                 console.log(${i})
                ">Remove</button>
            </div> 
        `
        bookS += html
        
    }
    document.querySelector(".main .bookDetail").innerHTML = bookS
}
function addBooklibray(){    

   const title = document.getElementById("title")
   const author = document.getElementById("author")
   const pages = document.getElementById("pages")
   const myFile = document.getElementById("myFile")
   const readElm = document.querySelector(".mrk .mrkRead")
   const libraryElm = {
        title : title.value,
        author: author.value,
        pages : pages.value,
        file  : myFile.value,
        makeUnread  : readElm.checked,
        index : library.length
   }
   library.push(libraryElm)
   saveLocal()
   console.log("LIbrary Length",library.length)

   showBooks()
}

submitBtn.addEventListener("click",(event)=>{
    if(document.getElementById("title").value!== '' && document.getElementById("author").value!=='' && document.getElementById("pages").value !==''){
        addBooklibray()
        event.preventDefault()
        closeaddBookModal()
    }
})


let undoList = []
// let undolist = []
let undoBtn = document.querySelector(".undoBtn")
// const saveUndoLocal =()=>{
//     localStorage.setItem('undolibrarylist',JSON.stringify(undolist))
// }
undoBtn.addEventListener("click",()=>{
    undoItem()
    undoCondition()
    showBooks()
})
// displayUndoBtn()

const notdisplayUndoBtn =()=>{
        undoBtn.classList.add('disable')
        document.querySelector(".addBtn").classList.remove('active')
        document.querySelector(".loginBtn").classList.remove('active')
        document.querySelector(".logoText img").classList.remove('active')
        document.querySelector(".logoText .primaryText").classList.remove('active')
}
const displayUndoBtn=()=>{
        undoBtn.classList.remove("disable")  
        document.querySelector(".addBtn").classList.add('active')
        document.querySelector(".loginBtn").classList.add('active')
        document.querySelector(".logoText img").classList.add('active')
        document.querySelector(".logoText .primaryText").classList.add('active')
}
undoCondition()

function undoCondition(){
    if(undoList.length==0){
        notdisplayUndoBtn()
    }
    else{
        displayUndoBtn()
    }
}
function undoItem(){
    // JSON.parse(localStorage.getItem('undolibrarylist'))
    let undoElm = undoList.pop()
    let undoIndex = undoElm.index

    let undoLibrary = JSON.parse(localStorage.getItem('libraryList'))
    undoLibrary.splice(undoIndex, 0, undoElm)
    // localStorage.removeItem('libraryList')

    localStorage.setItem('libraryList',JSON.stringify(undoLibrary))
}
function removeBook(event){
    
    let libraryCode = JSON.parse(localStorage.getItem('libraryList'))
    console.log(libraryCode)
    let item = libraryCode.splice(event,1)

    // console.log("this is lc")
    // console.log(libraryCode)
    // console.log("this is item")
    // console.log(item);

    // undoCondition()
    undoList.push(item)
    // undolist.push(item)
    // saveUndoLocal()
    // localStorage.removeItem('libraryList')
    localStorage.setItem('libraryList',JSON.stringify(libraryCode))

    showBooks()
}

function markUnread(){
    let unread = document.querySelector(".mrk .mrkRead")
    if(unread.checked == true){
        document.querySelector(".markRead").textContent = 'Already read'
    }
    else if(unread.checked == false){
        document.querySelector(".markRead").textContent = 'Mark as read'
    }
}

// not working

// readButton();
// function readButton(){
//     let unreadList = JSON.parse(localStorage.getItem('libraryList'))
//     for(let event in unreadList){
//         let colorRed = document.querySelector(".read")
//         if(unreadList[event].makeUnread == true){
//             colorRed.innerHTML= 'Read'
//             colorRed.classList.remove('unread')
//         }
//         if(unreadList[event].makeUnread == false){

//             colorRed.innerHTML='Unread'
//             colorRed.classList.add('unread')
//         }
//         console.log(colorRed.innerHTML)
//     }
//     localStorage.setItem('libraryList',JSON.stringify(unreadList))
//     showBooks();
// }
