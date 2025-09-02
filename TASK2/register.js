let container = document.getElementById('container');
let detail = document.getElementsByClassName('detail');
let formMessage = document.getElementById('formmessage');
let submit = document.getElementById('submit');
container.addEventListener('submit',function(event){
    event.preventDefault();
    for(let i =0;i<detail.length;i++){
        if(detail[i].value.trim() ===''){
            formMessage.textContent="**please fill all the details**";
            formMessage.style.color='red';
           

        }
        else{
            formMessage.textContent ='';
            submit.addEventListener('click',function(){
    window.location.href = 'register2.html';});
        }
    }
});

