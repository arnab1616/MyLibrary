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
document.querySelector("#cancelBtn").addEventListener("click",()=>{
    closeaddBookModal()
})
let library = []
 
// {title : 'Game of Thrones', author : 'Rk Narayan', pages : '23', file : 'file', index : 0, makeUnread: true},
//                 {title : 'Spider Man', author : 'Jems Bond',pages : '22', file : 'file', index : 1, makeUnread: false}

console.log(library)
const saveLocal = () => {
    localStorage.setItem('libraryList', JSON.stringify(library))
}
const removeLocal = () => {
    localStorage.removeItem('libraryList')
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
            <div class="img-container">
                <img id="choosenImg" src="./2x/Monkey.png" alt="" style="width:100%;">
            </div>
                <div style="display:flex; justify-content:space-between;" >
                    <p><strong>Title :</strong> "${items.title}" </p>
                    <div>
                        <input type="file" name="" id="upload-button" class="uploadImg" accept="image/*" style="display:none;">
                        <label for="upload-button" class="edit-img">
                            <i class="fa-solid fa-pen-to-square"></i>
                            Edit image
                        </label>
                    </div>
                </div>
            <p><Strong>Author :</Strong> ${items.author}</p>
            <p><Strong>Pages :</Strong> ${items.pages} <button class="viewBook" onclick = "showPdf(${i})"><u>View Book</u></button></p>
            
            <button class="unread" onclick="
            if(this.innerHTML === 'Unread'){
                this.innerHTML = 'Read'
                this.classList.remove('unread')
                this.classList.add('read')
            }
            else{
                this.innerHTML = 'Unread'
                this.classList.remove('read')
                this.classList.add('unread')
            }
            ">Unread</button>
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



changeImg()
function changeImg(){
    let books = document.querySelectorAll(".Bookcontainer")
    console.log(books.length)
    for(let l =0; l<books.length;l++){
        let uploadButton = books[l].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild
        let choosenImg = books[l].firstElementChild.firstElementChild
        uploadButton.onchange=()=>{
            let reader = new FileReader()
            reader.readAsDataURL(uploadButton.files[0])
            console.log(uploadButton.files[0])
            reader.onload = () =>{
                choosenImg.setAttribute('src',reader.result)
                console.log(reader.result)
            }
        }
    }
}
function showPdf(ind){
    document.querySelector("#pdfContainer").classList.add('active')
    document.querySelector("#choosenPdf").setAttribute('src', library[ind].file)
}
closePdf()
function closePdf(){
    document.querySelector(".closeBtn").addEventListener("click",()=>{
        document.querySelector("#pdfContainer").classList.remove('active')
    })
}
const pdfMaker = (e)=>{
    const myfile = document.querySelector("#myFile")
    const fileHref = document.querySelector("#changePdf")
    const choosePdf = document.getElementById("choosenPdf")
    myfile.addEventListener("change",()=>{
        let pdfreader = new FileReader()
        pdfreader.readAsDataURL(myfile.files[0])
        console.log(myfile.files[0])
                    
        pdfreader.addEventListener("load",()=>{
            fileHref.setAttribute('src', pdfreader.result)
            library[e].file = pdfreader.result
        })
    })
    
}
pdfMaker()
function addBooklibray(){    

   const title = document.getElementById("title")
   const author = document.getElementById("author")
   const pages = document.getElementById("pages")
   const myFile = document.getElementById("myFile")
   const fileHref = document.querySelector("#changePdf").getAttribute('src')
   const readElm = document.querySelector(".mrk .mrkRead")
   const libraryElm = {
        title : title.value,
        author: author.value,
        pages : pages.value,
        file  : fileHref,
        makeUnread  : readElm.checked,
        index : library.length
   }
   pdfMaker(libraryElm.index)
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
    let undoElm = undoList.pop()
    let undoIndex = undoElm.index

    let undoLibrary = JSON.parse(localStorage.getItem('libraryList'))
    undoLibrary.splice(undoIndex, 0, undoElm)

    removeLocal()
    localStorage.setItem('libraryList',JSON.stringify(undoLibrary))
}
function removeBook(event){
    
    let libraryCode = JSON.parse(localStorage.getItem('libraryList'))
    console.log("this is lc")
    console.log(libraryCode)
    console.log(event)
    let it = {}
    it = libraryCode[event]
    libraryCode.splice(event,1)

    console.log(it);

    undoList.push(it)
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
