let books = JSON.parse(localStorage.getItem("books"));
if (!books || books.length === 0) {
    books = initialBooks;
    localStorage.setItem("books", JSON.stringify(books));
}
let editIndex = -1

function showAdd(){
document.getElementById("addPage").style.display="block"
document.getElementById("listPage").style.display="none"
}

function showList(){
document.getElementById("addPage").style.display="none"
document.getElementById("listPage").style.display="block"
renderTable()
}

function submitForm(){

const id=document.getElementById("bookId").value.trim()
const title=document.getElementById("titleBook").value.trim()
const author=document.getElementById("author").value.trim()
const category=document.getElementById("category").value
const year=document.getElementById("year").value.trim()
const quantity=document.getElementById("quantity").value.trim()
const librarian=document.getElementById("librarian").value.trim()
const code=document.getElementById("code").value.trim()
const confirm=document.getElementById("confirmCode").value.trim()

if(!/^BK\d{5}$/.test(id)){
alert("Mã sách phải BK + 5 số")
return
}

if(title.length<3 || title.length>100){
alert("Tên sách 3-100 ký tự")
return
}

if(!/^[A-Za-z\s\.]+$/.test(author)){
alert("Tác giả chỉ chứa chữ")
return
}

if(category==""){
alert("Chọn thể loại")
return
}

let currentYear=new Date().getFullYear()

if(year<1900 || year>currentYear){
alert("Năm không hợp lệ")
return
}

if(quantity<1 || quantity>999){
alert("Số lượng 1-999")
return
}

if(librarian.length<5){
alert("Tên người thêm tối thiểu 5 ký tự")
return
}

if(!/^(?=(.*\d){2,})(?=(.*[A-Za-z]){2,}).{6}$/.test(code)){
alert("Mã xác thực không hợp lệ")
return
}

if(code!==confirm){
alert("Xác nhận mã không đúng")
return
}

const book={
id,
title,
author,
category,
year,
quantity,
librarian,
date:new Date().toLocaleDateString()
}

if(editIndex==-1){
books.push(book)
}else{
books[editIndex]=book
editIndex=-1
}

localStorage.setItem("books",JSON.stringify(books))

alert("Thành công")

showList()

}

function renderTable(){

const table=document.getElementById("tableBody")
const keyword=document.getElementById("search").value.toLowerCase()

table.innerHTML=""

let stats={}

books.forEach((b,i)=>{

if(keyword && !b.title.toLowerCase().includes(keyword) && !b.id.toLowerCase().includes(keyword)) return

table.innerHTML+=`

<tr>

<td>${b.id}</td>
<td>${b.title}</td>
<td>${b.author}</td>
<td>${b.category}</td>
<td>${b.year}</td>
<td>${b.quantity}</td>
<td>${b.librarian}</td>
<td>${b.date}</td>

<td>
<button class="edit" onclick="editBook(${i})">Sửa</button>
<button class="delete" onclick="deleteBook(${i})">Xóa</button>
</td>

</tr>
`

stats[b.category]=(stats[b.category]||0)+1

})

let statHTML="Tổng số sách: "+books.length+"<br>"

for(let c in stats){
statHTML+=c+": "+stats[c]+"<br>"
}

document.getElementById("stats").innerHTML=statHTML

}

function deleteBook(i){

if(confirm("Bạn chắc chắn muốn xóa?")){

books.splice(i,1)

localStorage.setItem("books",JSON.stringify(books))

renderTable()

}

}

function editBook(i){

const b=books[i]

editIndex=i

showAdd()

document.getElementById("bookId").value=b.id
document.getElementById("titleBook").value=b.title
document.getElementById("author").value=b.author
document.getElementById("category").value=b.category
document.getElementById("year").value=b.year
document.getElementById("quantity").value=b.quantity
document.getElementById("librarian").value=b.librarian

}

document.addEventListener("DOMContentLoaded",function(){

document.getElementById("search").addEventListener("keyup",renderTable)

renderTable()

})