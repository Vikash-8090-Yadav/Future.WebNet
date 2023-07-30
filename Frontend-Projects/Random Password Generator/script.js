const btnele= document.getElementById('btn');
const pele=document.getElementById('password')

const api_key="M0Vccm9ZQ5uOzEvm54FaZw==crUuS8lX9HaGaoCa";
const option={
    method:"GET",
    headers:{
        "X-Api-Key":api_key,
    },
};
const apiurl="https://api.api-ninjas.com/v1/passwordgenerator?length=12"


btnele.addEventListener('click',getpassword);

async function getpassword(){


    try {
        
        pele.innerText="Updating...";
    btnele.disabled= true;
    btnele.innerText="Loading";
    const res= await fetch(apiurl,option);
    const data=await res.json();
    // console.log(data[0].password);

   
    btnele.disabled= false;
    btnele.innerText="TELL ME A PASSWORD";

    pele.innerText=`"${data.random_password}"`;

    } catch (error) {
        pele.innerText="An error occured ,try again later!";
        btnele.disabled= false;
        btnele.innerText="TELL ME A PASSWORD";
        console.log(error);
    }    
    
}
