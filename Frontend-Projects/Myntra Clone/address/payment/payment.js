var form = document.querySelector("form").innerHTML;
var placeOrderBtn = document.querySelector(".payNowAjax-base-actionButton").innerHTML;
document.getElementById("card").addEventListener("click", showCard);
function showCard(){
    var x = document.querySelector("form");
    document.querySelector("#card").style.color = "red";
    document.querySelector("#cod").style.color = "black";
    document.querySelector("#cod").style.backgroundColor = "#f4f4f5";
    document.querySelector("#card").style.backgroundColor = "white";
    x.innerHTML = form;
    var btn = document.querySelector(".payNowAjax-base-actionButton");
    btn.addEventListener("click", function(){
        event.preventDefault();
        window.location = "thankyou.html";
    })
}
document.getElementById("cod").addEventListener("click", showCod);
function showCod(){
    var form = document.querySelector("form");
    form.innerHTML = "";

    document.querySelector("#card").style.color = "black";
    document.querySelector("#cod").style.color = "red";
    document.querySelector("#card").style.backgroundColor = "#f4f4f5";
    document.querySelector("#cod").style.backgroundColor = "white";

    var div = document.createElement("div");
    var headingDiv = document.createElement("div");
    headingDiv.innerText = "Pay on delivery (Cash/Card/UPI)";
    headingDiv.setAttribute("class","card-base-heading");

    var inputDiv = document.createElement("div");
    inputDiv.innerText = "You can pay via Cash/Card or UPI enabled app at the time of delivery. Ask your delivery executive for these options.";
    inputDiv.setAttribute("class", "codCardUI-base-helpText");
    div.append(headingDiv, inputDiv);
    
    var btn = document.createElement("button");
    btn.setAttribute("class", "payNowAjax-base-actionButton");
    btn.innerHTML = placeOrderBtn;
    // var formbtn = document.querySelector(".payNowAjax-base-actionButton");
    btn.addEventListener("click", function(){
        event.preventDefault();
        // alert("Order confirmed")
        location = "thankYou.html";
    });
    form.append(div, btn);
}

var addressTotalObj = JSON.parse(localStorage.getItem("addressTotalObj"));
document.getElementById("totalmrp").innerText = addressTotalObj.totalmrp;
document.getElementById("totaldisc").innerText = addressTotalObj.totaldisc;
document.getElementById("totalamt").innerText = addressTotalObj.totalamt;
document.getElementById("priceDetails").innerText = addressTotalObj.totalItem;
