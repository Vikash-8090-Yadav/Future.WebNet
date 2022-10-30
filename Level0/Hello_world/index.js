
if(typeof window.ethereum =="undefined"){
		console.log("PLease install the metamask");
	}
	let web3 = new Web3(window.ethereum);
	let contract = new web3.eth.Contract(
		 [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_curentmood",
          "type": "string"
        }
      ],
      "name": "setmood",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getmood",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "0x0e0Cf7d7adA3d3e00561f3e6265951b28dCb876e"
  );
	let val;
   async function  account(){
   	let accounts = await web3.eth.requestAccounts();
    document.getElementById("lg").innerHTML =accounts[0];
   	console.log(accounts[0]);
   	// let set = await contract.methods.setmood(val).send({from:accounts[0]});

   	// let get = await contract.methods.getmood().call({from:accounts[0]});
   	// console.log(" "+get)
  	$('#set').click(async function(){
  		val = $("#in").val();
  			let a =await contract.methods.setmood(val).send({from:accounts[0]});
  			$("#btn").click(async function(){
  		    	let get = await contract.methods.getmood().call({from:accounts[0]});
  		   		document.getElementById("get-value").innerHTML=val;
  	  	});
  	});

  }
  // let set1 = 0;

  account();
  // set();
  // get();