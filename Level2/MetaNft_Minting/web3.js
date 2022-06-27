// import * from "./abi.json" assert { type: "module" };
if(typeof window.ethereum =="undefined"){
		console.log("PLease install the metamask");
}

 let web3 = new Web3(window.ethereum);
  console.log(web3.version)



async function interact{
	const contract = await
}
