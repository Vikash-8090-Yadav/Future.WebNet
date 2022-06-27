import Movements from "./Movement.js"


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

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

// cube.position.set(-10,1,0)

// const box = new THREE.Box3();
// box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );

// const helper = new THREE.Box3Helper( box, 0xffff00 );
// scene.add( helper );


const geometry_cylender = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material_cylender = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry_cylender, material_cylender );
scene.add( cylinder );

cylinder.position.set(30,5,0)

camera.position.z = 5;

camera.position.set(10,5,40);



function animate() {

	cube.rotation.z+=0.05;
	cube.rotation.x+=0.05;
	cylinder.rotation.z+=0.05;
	cylinder.rotation.x+=0.05;

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