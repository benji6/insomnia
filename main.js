var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true
});

var cubes = [];
var totalCubes = 32;
var radius = 16;
var x;
var y;
var phi;
var computePosition = function(i, radius, rotation) {
	if (!rotation) {
		rotation = 0;
	}
	phi = 2 * Math.PI / totalCubes * i + rotation;
	x = Math.cos(phi) * radius;
	y = Math.sin(phi) * radius;
	cubes[i].position.set(x, y, 0);
}
for (var i = 0; i < totalCubes; i++) {
	cubes[i] = new THREE.Mesh(geometry, material);
	computePosition(i, radius, 0);
	scene.add(cubes[i]);
}

camera.position.z = 32;

var rotation = 0;
function render() {
	requestAnimationFrame(render);
	rotation -= .001;
	var t = new Date().getTime()/2048;
	var r = radius + 4 * Math.sin(t);
	for (var i = 0; i < totalCubes; i++) {
		computePosition(i, r, rotation);
		cubes[i].rotation.x +=.1;
		cubes[i].rotation.y += .03;
		cubes[i].rotation.z += .07;
	}
	renderer.render(scene, camera);
}
render();
