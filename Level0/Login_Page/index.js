
if(typeof window.ethereum =="undefined"){
		console.log("PLease install the metamask");
}
  let accounts;
	let web3 = new Web3(window.ethereum);
	 async function  account(){
   	accounts = await web3.eth.requestAccounts();
   }

account();
$(document).ready(function(){
	// document.getElementById('add1').innerHTML=accounts;
	$("#btn").click(function(){
		alert(accounts);
		document.getElementById('add').innerHTML=accounts;
		window.location.replace("./new.html");

	});
});


