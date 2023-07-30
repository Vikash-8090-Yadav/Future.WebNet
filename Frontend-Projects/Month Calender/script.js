const month=document.getElementById('month');
const day=document.getElementById('day');
const date=document.getElementById('date');
const year=document.getElementById('year');

const curdate = new Date();
console.log(curdate);


const curmonth = curdate.getMonth();
 month.innerText = curdate.toLocaleString("en",{
    month:"long"
 });

 day.innerText= curdate.toLocaleString("en",{
    weekday:"long"
 });
 date.innerText=curdate.getDate()
 year.innerHTML=curdate.getFullYear()