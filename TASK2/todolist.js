

//To-Do List
let taskinput=document.getElementById("taskinput");
let addtask=document.getElementById("addtask");
let ol=document.getElementById("tasklist");
var li;

addtask.addEventListener("click",function(){
    if(taskinput.value===''){
        alert("please add some task!");}
    else{
        li=document.createElement("li");
        li.textContent=taskinput.value;
        li.style.marginLeft='160px';
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.style.marginLeft='145px';

        li.appendChild(deleteBtn);
        ol.appendChild(li);
        taskinput.value='';

        
deleteBtn.addEventListener('click',function(){
    ol.removeChild(li);
});
        
    }
});




