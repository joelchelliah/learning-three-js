// Scene
const scene = new THREE.Scene()


var clock = new THREE.Clock();

var paused = false;

// Camera
const fov = 75
const apectRatio = window.innerWidth/window.innerHeight
const nearPlane = 0.1
const farPlane = 1000
const camera = new THREE.PerspectiveCamera( fov, apectRatio, nearPlane, farPlane )

camera.position.y = 3;
camera.position.z = 10;
camera.lookAt( scene.position );

// Lights
const ambLight = new THREE.AmbientLight( "#101010" );
scene.add( ambLight );

var dirLight = new THREE.DirectionalLight( 0xffaabb );
dirLight.position.set( -60, 50, 10 ).normalize();
scene.add( dirLight );

// Renderer
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#100000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );


// Stuff!

var cube = new THREE.Mesh(
  new THREE.BoxGeometry( 4, 0.25, 4 ),
  new THREE.MeshPhongMaterial( { color: 0xaaaaff, flatShading: true, overdraw: 0.5, shininess: 0 } )
);

var cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry( 1, 0.5, 4, 32 ),
  new THREE.MeshPhongMaterial( { color: 0xaaffaa, flatShading: true, overdraw: 0.5, shininess: 0 } )
);

var sphere = new THREE.Mesh(
  new THREE.SphereGeometry( 0.5, 32, 32 ),
  new THREE.MeshPhongMaterial( { color: 0xffaaaa, flatShading: true, overdraw: 0.5, shininess: 0 } )
);

sphere.position.y += 2

scene.add( cube );
scene.add( cylinder );
scene.add( sphere );

var sphereDir = 0.02

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function onDocumentMouseMove( event ) {
				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY );
}


document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 32) {
        paused = !paused;
    }
};

// Render Loop
var render = function () {
  requestAnimationFrame( render );
  if(!paused) {
    cube.rotation.y += 0.1;

    if(sphere.position.y > 2.5 || sphere.position.y < 1.5) sphereDir = -sphereDir

    sphere.position.y = 3 + Math.sin(clock.getElapsedTime())

    camera.position.x += ( mouseX - camera.position.x ) * 0.0001;
    camera.position.y -= ( mouseY - camera.position.y ) * 0.0001;

    // Render the scene
    renderer.render(scene, camera);
  }
};

render();
