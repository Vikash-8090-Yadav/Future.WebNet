
// let x;
// let y;
// function move(){
    
//     window.addEventListener("mousemove",(e)=>{
//         const rm=document.querySelector(":root")
//     const mouseEvent=document.getElementsByClassName("svg__size")
//         // console.log(e.clientX)
//         // console.log(e.clientY)
//         x=(e.clientX)/10;
//         y=(e.clientY)/10;
//         rm.style.setProperty("--X-axis",`${-x+"px"}`)
//         rm.style.setProperty("--Y-axis",`${-y+"px"}`)

        
//         // mouseEvent.style.transform = `translate(${e.clientX - 7}px, ${e.clientY - 7}px)`;
        
//         console.log(x,y)
//         // console.log(`${x+y+"%"}`)
//     })
// }
// move()

// // Display the loading animation
// document.getElementById('loader__img').style.display = 'block';

// // Hide the loading animation after a delay
// document.addEventListener('DOMContentLoaded', function() {
//   // Task completed
  
//   document.getElementById("animation__body").style.display="none"
//   setTimeout(function() {
//     document.getElementById('loader__img').style.display = 'none';
//     document.getElementById("animation__body").style.display="block";
//   }, 4000); // Adjust the delay time (in milliseconds) as needed
// });


const loader=document.getElementById("loader-img");
loader.style.display="block"
const bodyLoader=document.getElementById("animation__body")

addEventListener("DOMContentLoaded",function()
{
    bodyLoader.style.display="none"

    setTimeout(function(){
        loader.style.display="none"
        bodyLoader.style.display="block"
    
    
    },2000)
})


// console.log(loader)
