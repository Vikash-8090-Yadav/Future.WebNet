import Movements from "./Movement.js"

import ganche from "./web3.js"
const scene = new THREE.Scene();
// scene.background = new THREE.Color("yellowgreen");
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambient_light = new THREE.AmbientLight(0x404040);
const direction_light = new THREE.DirectionalLight(0xffffff,1);
ambient_light.add(direction_light);
scene.add(ambient_light);


const geometry_area = new THREE.BoxGeometry( 100, 0.2, 50 );
const material_area = new THREE.MeshPhongMaterial( { color: 0xffffff } );

const area = new THREE.Mesh( geometry_area, material_area );
scene.add(area);

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );

// scene.add( cube );

// cube.position.set(-10,1,0)

// const box = new THREE.Box3();
// box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );

// const helper = new THREE.Box3Helper( box, 0xffff00 );
// scene.add( helper );


// const geometry_cylender = new THREE.CylinderGeometry( 5, 5, 20, 32 );
// const material_cylender = new THREE.MeshPhongMaterial( {color: 0xffff00} );
// const cylinder = new THREE.Mesh( geometry_cylender, material_cylender );
// scene.add( cylinder );

// cylinder.position.set(30,5,0)

camera.position.z = 5;

camera.position.set(10,5,40);



function animate() {

	// cube.rotation.z+=0.05;
	// cube.rotation.x+=0.05;
	// cylinder.rotation.z+=0.05;
	// cylinder.rotation.x+=0.05;

	camera.rotation.x+=0.1;
	camera.rotation.y+=0.1;


	requestAnimationFrame( animate );

	// left key
	if(Movements.isPressed(37)){
		camera.position.x-=0.5;
	}

	//  up key
	if(Movements.isPressed(38)){
		camera.position.x+=0.5;
		camera.position.y+=0.5;
	}

	// right key
	if(Movements.isPressed(39)){
		camera.position.x+=0.5;
	}

	// down key
	if(Movements.isPressed(40)){
		camera.position.x-=0.5;
		camera.position.y-=0.5;
	}

	camera.lookAt(area.position);
	renderer.render( scene, camera );
}
animate();

renderer.render(scene,camera);



const button = document.querySelector("#mint");
button.addEventListener("click", mintNFT);

async function mintNFT() {
  let nft_name = document.querySelector("#nft_name").value;
  let nft_width = document.querySelector("#nft_width").value;
  let nft_height = document.querySelector("#nft_height").value;
  let nft_depth = document.querySelector("#nft_depth").value;
  let nft_x = document.querySelector("#nft_x").value;
  let nft_y = document.querySelector("#nft_y").value;
  let nft_z = document.querySelector("#nft_z").value;

  if (typeof window.ethereum == "undefined") {
    rej("You should install Metamask");
  }

  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
  	[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "inputs": [],
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "maxMinting",
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
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
      "name": "objects",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "int8",
          "name": "w",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "h",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "d",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "x",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "y",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "z",
          "type": "int8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
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
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getObjects",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "int8",
              "name": "w",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "h",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "d",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "x",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "y",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "z",
              "type": "int8"
            }
          ],
          "internalType": "struct Metaverse.Object[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalMint",
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
          "internalType": "string",
          "name": "_object_name",
          "type": "string"
        },
        {
          "internalType": "int8",
          "name": "_w",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "_h",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "_d",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "_x",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "_y",
          "type": "int8"
        },
        {
          "internalType": "int8",
          "name": "_z",
          "type": "int8"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "getOwnerObjects",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "int8",
              "name": "w",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "h",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "d",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "x",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "y",
              "type": "int8"
            },
            {
              "internalType": "int8",
              "name": "z",
              "type": "int8"
            }
          ],
          "internalType": "struct Metaverse.Object[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],
  "0x780A6F657f098e16D93963F4996b47434B40147B"
  );

  web3.eth.requestAccounts().then((accounts) => {
  	// $("#mint").click(function (){
  	// })
    contract.methods
      .mint(String(nft_name), String(nft_width), String(nft_height), String(nft_depth), String(nft_x), String(nft_y), String(nft_z))
      .send({
        from: String(accounts),
        value: (web3.utils.toWei("1",'ether'))
      })
      .then((data) => {
        console.log("NFT is minted");
      });

  });
}

ganche.then((result)=>{
	result.nft.forEach((object,index)=>{
		if(index<=result.supply){

	const geometry_cone = new THREE.ConeGeometry(object.w,object.h,object.d);
	const material_cone = new THREE.MeshPhongMaterial( {color: 0xffff00} );

	// cylinder.position.set(30,5,0)

	const nft = new THREE.Mesh(geometry_cone, material_cone);

    nft.position.set(object.x, object.y, object.z);
     scene.add(nft);
		}
	})
})