var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

var cubes = [];
var totalCubes = 16;
var radius = 16;
var x;
var y;
var phi;
var computePosition = function() {
	phi = 2 * Math.PI / totalCubes * i;
	x = Math.cos(phi) * radius;
	y = Math.sin(phi) * radius;
	cubes[i].position.set(x, y, 0);
}
for (var i = 0; i < totalCubes; i++) {
	cubes[i] = new THREE.Mesh(geometry, material);
	computePosition();
	scene.add(cubes[i]);
}

camera.position.z = 32;

function render() {
	requestAnimationFrame(render);
	for (var i = 0; i < totalCubes; i++) {
		cubes[i].rotation.x +=.1;
		cubes[i].rotation.y += .05;
	}
	radius +=.1;
	renderer.render(scene, camera);
}
render();
