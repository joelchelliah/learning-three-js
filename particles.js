var tau = Math.PI * 2;
var width, height;
var scene, camera, renderer, pointCloud;
var geometry = new THREE.Geometry();

function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  updateRendererSize();
}

function updateRendererSize() {
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function initialize() {
  const fov = 120
  const apectRatio = window.innerWidth/window.innerHeight
  const nearPlane = 1
  const farPlane = 1000

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera( fov, apectRatio, nearPlane, farPlane )
  renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  var material = new THREE.PointsMaterial({
    size: 5,
    vertexColors: THREE.VertexColors
  });

  var x, y, z;
  _.times(1000, function(n){
    x = (Math.random() * 800) - 400;
    y = (Math.random() * 800) - 400;
    z = (Math.random() * 800) - 400;

    geometry.vertices.push(new THREE.Vector3(x, y, z));
    geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
  });

  var pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);
}

function render() {
  requestAnimationFrame( render );

  _.forEach(geometry.vertices, function(particle, index){
    var dX, dY, dZ;
    dX = Math.random() * 2 - 1;
    dY = Math.random() * 2 - 1;
    dZ = Math.random() * 2 - 1;

    particle.add(new THREE.Vector3(dX, dY, dZ));
    geometry.colors[index] = new THREE.Color(Math.random(), Math.random(), Math.random());
  });
  geometry.verticesNeedUpdate = true;
  geometry.colorsNeedUpdate = true;

  renderer.render(scene, camera);
};

initialize();
render();
