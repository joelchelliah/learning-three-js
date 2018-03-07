var width, height,
    scene, camera, renderer,
    pointCloud,
    pointCloudGeometry = new THREE.Geometry();

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

function addPointCloud(geometry) {
  var radius = 500;
  var numPoints = 2000;
  var texture = new THREE.TextureLoader().load( "textures/white-dot.png" );
  var material = new THREE.PointsMaterial({
    size: 3,
    map: texture,
    transparent: true,
    //color: "#FFFFFF",
    vertexColors: THREE.VertexColors
  });

  var x, y, z;
  _.times(numPoints, function(n){
    x = Math.random() * radius * 2 - radius;
    y = Math.random() * radius * 2 - radius;
    z = Math.random() * radius * 2 - radius;

    geometry.vertices.push(new THREE.Vector3(x, y, z));
    geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
  });

  var pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);
}

function updatePointCloud(geometry, timer) {
  var d = 0.5;
  var dX, dY, dZ;
  _.forEach(geometry.vertices, function(particle, index) {
    dX = Math.random() * 2 * d - d;
    dY = Math.random() * 2 * d - d;
    dZ = Math.random() * 2 * d - d;

    particle.add(new THREE.Vector3(dX, dY, dZ));
    geometry.colors[index] = new THREE.Color(Math.random(), Math.random(), Math.random());
  });
  geometry.verticesNeedUpdate = true;
  geometry.colorsNeedUpdate = true;
}

function addCircle() {
  var radius = 300,
    segments = 64,
    material = new THREE.LineBasicMaterial( { color: 0xFFFFFF } ),
    geometry = new THREE.CircleGeometry( radius, segments );

  geometry.vertices.shift();

  var circle = new THREE.Line( geometry, material )
  scene.add( circle );
}

function initialize() {
  const fov = 120
  const apectRatio = window.innerWidth/window.innerHeight
  const nearPlane = 1
  const farPlane = 1000

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera( fov, apectRatio, nearPlane, farPlane )
  camera.position.z = 500

  renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize);

  onWindowResize();
  addPointCloud( pointCloudGeometry );
}

function render() {
  var speed = 0.0002;
  var timer = Date.now() * speed;

  requestAnimationFrame( render );
  updatePointCloud( pointCloudGeometry, timer );

  camera.position.x = Math.cos( timer ) * 200;
  camera.position.z = Math.sin( timer ) * 200;
  camera.lookAt( scene.position );


  renderer.render(scene, camera);
};

initialize();
render();
