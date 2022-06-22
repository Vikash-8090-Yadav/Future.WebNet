
if(typeof window.ethereum =="undefined"){
		console.log("PLease install the metamask");
}
  let accounts;
	let web3 = new Web3(window.ethereum);
	 async function  account(){
   	accounts = await web3.eth.requestAccounts();
   }

async function hidebtn(){

	await $("#btn").slideToggle();
	$("#cnf").html("Sucessfully Log in ")
}

account();
$(document).ready(async function(){
	// document.getElementById('add1').innerHTML=accounts;
	await $("#btn").click(async function(){
		alert(accounts);
		document.getElementById('add').innerHTML=accounts;
		await hidebtn();
	});
});


