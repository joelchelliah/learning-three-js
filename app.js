// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#100000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var cube = new THREE.Mesh(
  new THREE.BoxGeometry( 2, 1, 1.5 ),
  new THREE.MeshBasicMaterial( { color: "#433FDD" } )
);

var cube2 = new THREE.Mesh(
  new THREE.BoxGeometry( 0.5, 2.5, 1 ),
  new THREE.MeshBasicMaterial( { color: "#DD2243" } )
);

// Add cube to Scene
scene.add( cube );
scene.add( cube2 );

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube2.rotation.x -= 0.01;
  cube2.rotation.y -= 0.03;

  // Render the scene
  renderer.render(scene, camera);
};

render();
