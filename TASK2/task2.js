let head=document.getElementsByClassName("title");
for(let i=0;i<head.length;i++)
    head[i].addEventListener('mouseover',function(){
    head[i].style.color="red";

});
for(let i=0;i<head.length;i++)
    head[i].addEventListener('mouseout',function(){
    head[i].style.color="white";

});