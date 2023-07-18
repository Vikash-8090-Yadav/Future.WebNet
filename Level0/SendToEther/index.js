$(document).ready(function() {
  $('#send').click(function(e) {
    e.preventDefault();
    window.location.href = "success.html";
  });
});

if(typeof window.ethereum =="undefined"){
		console.log("PLease install the metamask");
	}
  let accounts;
	let web3 = new Web3(window.ethereum);
	 async function  account(){
   	accounts = await web3.eth.requestAccounts();
    // document.getElementById("lg").innerHTML =accounts[0];
   	// console.log(accounts[0]);
   	// web3.utils.balance();
   }
   account();
   // let addre = "0x9A44E04923Ff073fD5e00b5F3d89a0BDeD61f05c";

   	let contract = new web3.eth.Contract(
   		[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "owner",
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
          "internalType": "address payable",
          "name": "to_sent",
          "type": "address"
        }
      ],
      "name": "send",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    ],

  "0xA4fC70e23b9b3dFD6c4d61255FF42a63cb6cD9E3"
  );

   //0xf6FCD7972496B42fD241e3C10181b46D6baB4E59 ->  send 2 eather to this address

   let amount,add;

  //  $(document).ready(function(){
  //  	$("#send").click(function (){
  //  		add = $("#in").val();
  //     amount = $("#am").val();

  //     contract.methods.send(String(add)).send({from:String(accounts),gas : 210000, value  :web3.utils.toWei(amount,'ether')},

  //       function(error,result){
  //         if(error){
  //           console.log("error"+error);
  //         }
  //         else{
  //           document.getElementById('h').innerHTML="<h1 >SUcESS</h1>"
  //         }
  //       }

  //     );
   	// });

    // $("#acc-btn").click(function(){

    //   $("#sh").html("accounts")

    //   web3.eth.getBalance(accounts,
    //   function(err,result){
    //     if(err){
    //       console.log("The error is "+err);

    //     }
    //     else{
    //       $("sh").html($(accounts))
    //     }
    //   });

  //   });

  // });


   // async function all_methods(){

   // 	contract.methods.send("0x62caB26E7f7b7F811D1DAC668d6476282B039106").send({from:"0x26CfeD388034b8B0ea2e13B8FE00f39700E6991c",value  :web3.utils.toWei(amount,'ether')},

   // 		function(error,result){
   // 			if(error){
   // 				console.log("error"+error);
   // 			}
   // 			else{
   // 				console.log("Sucess->1"+result);
   // 			}
   // 		}

   // 		);
   // }


      web3.eth.getBalance(accounts,
   	function(err,result){
   		if(err){
   			console.log("The error is "+err);

   		}
   		else{
   			console.log("Sucess->"+result);
   		}
   	});





// all_methods();
   // web3.eth.getBalance("0x62caB26E7f7b7F811D1DAC668d6476282B039106",
   // 	function(err,result){
   // 		if(err){
   // 			console.log("The error is "+err);

   // 		}
   // 		else{
   // 			console.log("Sucess->"+result);
   // 		}
   	// });



