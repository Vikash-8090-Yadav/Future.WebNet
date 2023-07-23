const next= document.querySelector('.next');
const prev= document.querySelector('.prev');
const imgcontainer=document.querySelector('.imgcontainer');
const imgs=document.querySelectorAll('img');
let curimg=1;
let timeout;

next.addEventListener('click',()=>{
curimg++;
clearTimeout(timeout);
updateimg();
})
updateimg()
function updateimg(){
    if(curimg>imgs.length){
        curimg=1;
    }
    else if(curimg> imgs.length){
        curimg=imgs.length;
    }
    
 imgcontainer.style.transform= `translateX(-${(curimg-1)*500}px)`;
 timeout=setTimeout(()=>{
    curimg++;
    updateimg();
 },3000)
}

prev.addEventListener('click',()=>{
  curimg--;
  clearTimeout(timeout);
  updateimg()
})
