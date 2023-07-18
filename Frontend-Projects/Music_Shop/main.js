// let icons = document.getElementsByClassName("hamburger");

// // Loop through the collection of elements
// for (let i = 0; i < icons.length; i++) {
//   let icon = icons[i];
  
//   // Attach event listener to each individual element
//   icon.addEventListener("click", (e) => {
//     // Event handler code goes here
//     const list=document.querySelector(".list__nav")
//     list.classList.toggle("active__class__nav")
//     console.log("clicked")
//   });
// }


const icon=document.querySelector(".hamburger")
icon.addEventListener("click",(e)=>{
  const list=document.querySelector(".list__nav")
  list.classList.toggle("active__class__nav")

})