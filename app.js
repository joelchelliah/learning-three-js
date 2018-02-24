// Scene
const scene = new THREE.Scene()

// Camera
const fov = 75
const apectRatio = window.innerWidth/window.innerHeight
const nearPlane = 0.1
const farPlane = 1000
const camera = new THREE.PerspectiveCamera( fov, apectRatio, nearPlane, farPlane )

camera.position.z = 5;


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
  new THREE.BoxGeometry( 3, 0.5, 3 ),
  new THREE.MeshBasicMaterial( { color: "#433FDD" } )
);

var cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry( 1, 0.5, 2, 32 ),
  new THREE.MeshBasicMaterial( { color: "#DD2243" } )
);

var sphere = new THREE.Mesh(
  new THREE.SphereGeometry( 0.5, 32, 32 ),
  new THREE.MeshBasicMaterial( { color: "#11AA22" } )
);

sphere.position.y += 2

scene.add( cube );
scene.add( cylinder );
scene.add( sphere );

var sphereDir = 0.02

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  cube.rotation.y += 0.05;

  if(sphere.position.y > 2.5 || sphere.position.y < 1.5) sphereDir = -sphereDir

  sphere.position.y += sphereDir

  // Render the scene
  renderer.render(scene, camera);
};

render();
