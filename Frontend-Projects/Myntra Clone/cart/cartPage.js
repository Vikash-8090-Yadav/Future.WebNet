var cartobj= JSON.parse(localStorage.getItem("McartData"))||[];

console.log(cartobj);

var totalamt=0;
var totalmrp=0;
var totaldisc=0;

displayData(cartobj);

function displayData(data){

    totalamt=0;
    totalmrp=0;
    totaldisc=0;
    
    
    document.querySelector("#cartitemparent").innerHTML = "";
    data.map(function(elem,index){

        var img=document.createElement("img");
        img.setAttribute("src",elem.image_url);
        
        var brand=document.createElement("div");
        brand.innerText=elem.brand;

        var name=document.createElement("p");
        name.innerText=elem.name;

        var sizediv=document.createElement("div");
        var size=document.createElement("button");
        size.innerText="Size";

        var qty=document.createElement("button");
        qty.addEventListener("click",function(){
            openPopup(elem,index);
        });
        qty.innerText="Qty:"+elem.quantity;
        qty.setAttribute("id","qty");
        sizediv.append(size,qty);

        var prizediv= document.createElement("div");
        var price=document.createElement("p");
        price.innerText="₹"+elem.price*elem.quantity;
        price.style.fontWeight="600";
        price.setAttribute("id","price")
        totalamt += (parseInt(elem.price))*(parseInt(elem.quantity));
        
        var strikedoffprice=document.createElement("p");
        strikedoffprice.innerText="₹"+elem.strikedoffprice;
        strikedoffprice.style.textDecoration="line-through";
        strikedoffprice.style.color="#94969f";
        strikedoffprice.setAttribute("id","strikedoffprice");

        totalmrp+=(parseInt(elem.strikedoffprice))*(parseInt(elem.quantity));

        var disc=document.createElement("p");
        var off=Math.round(((elem.strikedoffprice-elem.price)/elem.strikedoffprice)*100);
        disc.innerText=off+"% OFF";
        disc.style.color="#f16565";
        totaldisc+=parseInt(elem.strikedoffprice-elem.price)*(parseInt(elem.quantity));
        prizediv.append(price,strikedoffprice,disc);

        var delivery=document.createElement("div");
        delivery.innerText="Express Delivery in 2 Days";

        var leftchild =document.createElement("div");
        leftchild.append(img);
        leftchild.setAttribute("class","leftchild");
        var rightchild= document.createElement("div");
        rightchild.append(brand,name,sizediv,prizediv,delivery);
        rightchild.setAttribute("class","rightchild");

        var crossdiv=document.createElement("div");
        var cross=document.createElement("img");
        cross.setAttribute("src","https://cdn.onlinewebfonts.com/svg/img_265949.png");
        crossdiv.setAttribute("class","crossdiv");
        crossdiv.append(cross);
        crossdiv.addEventListener("click",function(){
            removeRow(index)
        });

        var cartitemdiv=document.createElement("div");
        cartitemdiv.setAttribute("class","cartItemsList");
        cartitemdiv.append(leftchild,rightchild,crossdiv);

        document.querySelector("#cartitemparent").append(cartitemdiv);
        document.getElementById("itemselected").innerText= cartobj.length+" ITEMS SELECTED";

    })
    displayRightside();
}


function displayRightside(){
    document.getElementById("priceBreakup").innerHTML="";
    var mrpdiv=document.createElement("div");
    var mrp1=document.createElement("div");
    var mrp2=document.createElement("div");
    mrp1.innerText="Total MRP";
    mrp2.innerText="₹"+totalmrp;
    mrp2.setAttribute("id","totalmrp");
    mrpdiv.append(mrp1,mrp2);

    var discdiv=document.createElement("div");
    var disc1=document.createElement("div");
    var disc2=document.createElement("div");
    disc1.innerText="Discount on MRP";
    disc2.innerText="₹"+totaldisc;
    disc2.setAttribute("id","totaldisc");
    discdiv.append(disc1,disc2);

    var coupondiv=document.createElement("div");
    var coupon1=document.createElement("div");
    var coupon2=document.createElement("div");
    coupon1.innerText="Coupon Discount";
    coupon2.innerText="Apply Coupon";
    coupon2.setAttribute("id","cpn300");
    coupondiv.append(coupon1,coupon2);

    var convdiv=document.createElement("div");
    var conv1=document.createElement("div");
    conv1.innerText="Convenience Fee";
    var conv2=document.createElement("div");
    var span1= document.createElement("span");
    span1.innerText="₹99";
    span1.style.textDecoration="line-through";
    var span2=document.createElement("span");
    span2.innerText="FREE";
    span2.style.color= "#03a685";
    conv2.append(span1,span2);
    convdiv.append(conv1,conv2);

    var totaldiv=document.createElement("div");
    var total1=document.createElement("div");
    total1.innerText="Total Amount";
    var total2=document.createElement("div");
    total2.innerText="₹"+totalamt;
    total2.setAttribute("id","totalamt");
    totaldiv.append(total1,total2);

    var btn=document.createElement("button");
    btn.innerText = "PLACE ORDER";
    
    btn.addEventListener("click", function () {
        window.location="../address/address.html"
    })

    document.getElementById("priceBreakup").append(mrpdiv,discdiv,coupondiv,convdiv,totaldiv,btn);

    document.getElementById("priceDetails").innerText = cartobj.length;
    // address page total Object 
    var addressTotalObj = {
        totalItem: cartobj.length,
        totalmrp: totalmrp,
        totaldisc: totaldisc,
        totalamt: totalamt,
    }
    console.log(totalamt+"totalamtfinal");
    localStorage.setItem("addressTotalObj",JSON.stringify(addressTotalObj));

}
function removeRow(index){

    totalamt-=(cartobj[index].price)*(cartobj[index].quantity);
    totalmrp-=(cartobj[index].strikedoffprice)*(cartobj[index].quantity);
    totaldisc-=totalmrp-totalamt;
    cartobj[index].quantity = 0;
    
    console.log(cartobj[index].quantity);
    cartobj.splice(index, 1);
    localStorage.setItem("cartTotalBag", JSON.stringify(cartobj.length));
    localStorage.setItem("McartData", JSON.stringify(cartobj));
    displayData(cartobj);
    displayRightside();
}

let modal=document.getElementById("modal");
let popup=document.getElementById("popupdiv");
var i;
var element={}
function openPopup(elem,index){
    element=elem;
    i=index;
popup.classList.add("openpopup");
modal.classList.add("openpopup");
}
function closePopup(){
    popup.classList.remove("openpopup");
    modal.classList.remove("openpopup");
}
function opencoupon(){
document.getElementById("couponpopup").classList.add("openpopup");
modal.classList.add("openpopup");
}
function closecoupon(){
    document.getElementById("couponpopup").classList.remove("openpopup");
    modal.classList.remove("openpopup");
}
document.getElementById("num1").addEventListener("click",function(){
    var num=parseInt(event.target.innerText);
    multiplyQty(element,num,cartobj,i);
})
document.getElementById("num2").addEventListener("click",function(){
    var num=parseInt(event.target.innerText);
    multiplyQty(element,num,cartobj,i);
})
document.getElementById("num3").addEventListener("click",function(){
    var num=parseInt(event.target.innerText);
    multiplyQty(element,num,cartobj,i);
})
document.getElementById("num4").addEventListener("click",function(){
    var num=parseInt(event.target.innerText);
    multiplyQty(element,num,cartobj,i);
})
document.getElementById("num5").addEventListener("click",function(){
    var num=parseInt(event.target.innerText);
    multiplyQty(element,num,cartobj,i);
})

function  multiplyQty(element,num,cartobj,i){
   var num1=parseInt(cartobj[i].quantity);
    cartobj[i].quantity=num;
    var price=parseInt(cartobj[i].price);
    
    // cartobj[i].price=price*num;
    
    document.getElementById("price").innerText=price*num;

    var strikedoffprice=parseInt(cartobj[i].strikedoffprice);
    
    // cartobj[i].strikedoffprice=strikedoffprice*num;
    document.getElementById("strikedoffprice").innerText=strikedoffprice*num;
    //  totalamt += ((price)*(num-num1));
    // document.getElementById("totalamt").innerText ="₹"+totalamt;

    //   totalmrp += ((strikedoffprice)*(num-num1));
    // document.getElementById("totalmrp").innerText ="₹"+totalmrp;

    // var discount=totalmrp-totalamt;
    // document.getElementById("totaldisc").innerText="₹"+discount;
        
    // document.getElementById("qty").innerText="Qty:"+num;

    localStorage.setItem("McartData",JSON.stringify(cartobj));
    console.log(totalamt+"totalamtqty");
    displayData(cartobj);
    
element={};
index=0;
}
function applyCoupon(){
    if(totalamt>1499){
        totalamt-=301;
        document.getElementById("inputdiv").innerHTML="";
        document.getElementById("inputdiv").innerText="COUPON APPLIED";
        document.getElementById("inputdiv").style.color="#ff3f6c";
        // document.getElementById("inputdiv").style.border="none";
        document.getElementById("inputdiv").style.padding="5px 80px";
        
        displayRightside();
        document.getElementById("cpn300").innerText="-₹300";
    }
    
}