if(typeof window.ethereum =="undefined"){
		console.log("PLease install the metamask");
}

 let web3 = new Web3(window.ethereum);
  console.log(web3.version)

async function interact (){
	const contract = await new web3.eth.Contract(
		[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "cost",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "seling_items",
      "outputs": [
        {
          "internalType": "string",
          "name": "Name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "Id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Cost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Time",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "seller",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_Id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_Name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_Cost",
          "type": "uint256"
        }
      ],
      "name": "AllItem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_Id",
          "type": "uint256"
        }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "view_item",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],
  "0x0bD69765bfE805894d12C5539D8aaB6462aB2EE1"
);
	  let accounts = await web3.eth.requestAccounts();
	  alert(accounts);

	  // let owner;
	  // await contract.methods.seller().call().then(function (resp){
	  // 	owner = resp;
	  // })
	  // console.log(owner);
	let id = await $("#frt-id").val();
	let name = await $("#frt-name").val();
	let cost = await $("#frt-cost").val();

	 const owner =  await contract.methods.seller().call();
	 console.log(owner);

	 $("#btn").click(async function (){
	 	let id1 =  web3.utils.toBN(id).toString();
	 	let cost1 = web3.utils.toBN(cost).toString();
    // const name1 = web3.utils.toBN(name);
	 	await contract.methods.AllItem(id1 , (name) ,cost1).send({from:String(owner)});
	});


	$("#btn1").click(async function (){
    let accounts1;
		await web3.eth.requestAccounts().then(function (resp){
      accounts1 = resp[0];
    });
		if(accounts1 == owner){
			alert("Owner is not allowed  to buy the fruits");
		}
		else{
		const buy2 = await $("#in").val();
	 	const valu2 = web3.utils.toBN(buy2).toString();
		const cost_1 = await contract.methods.cost(buy2).call();
    console.log("cost->"+cost_1);
    // contract.methods.seling_items(valu2).call().then(function (resp){
    //   console.log(resp);
    // })
		await contract.methods.buy(buy2).send({from:String(accounts1),value  :web3.utils.toWei(cost_1,'ether')});
	}
	})

	await $("#btn2").click(async function (){
		const buy2 =  $("#in").val();
	 	const valu2 = web3.utils.toBN(buy2).toString();
		alert(valu2);
		await contract.methods.view_item().call().then(function (resp){
			console.log(resp);
		})
	})

}



$("document").ready(function (){

$("#btn").click(function (){
	const id = $("#frt-id").val();
	const name = $("#frt-name").val();
	const cost = $("#frt-cost").val();

	let tr = document.createElement("tr");
	let tdId  = tr.appendChild(document.createElement("td"));
	let tdName  = tr.appendChild(document.createElement("td"));
	let tdCost  = tr.appendChild(document.createElement("td"));
	(tdId).innerHTML = id;
	(tdName).innerHTML = name;
	(tdCost).innerHTML = cost;

	document.getElementById('tb').appendChild(tr);
});

});


interact();