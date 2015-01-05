var THREE = require('three');
var tinytic = require('tinytic');

var Cube = require('./lib/Cube.js');
var Sphere = require('./lib/Sphere.js');
var light = require('./lib/light.js');
var computeCubePosition = require('./lib/computeCubePosition.js');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 64;
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.className = "fullscreen";
document.body.appendChild(renderer.domElement);

var sphere = Sphere();
var cubes = [];
var totalCubes = 64;
var orbitRadius = 16;

for (var i = 0; i < totalCubes; i++) {
	cubes[i] = Cube();
	scene.add(cubes[i]);
}
scene.add(sphere);
scene.add(light.ambientLight);
scene.add(light.directionalLight);

var isRunning;

var computeModel = function() {
	var coords;
	var dT = tinytic.toc(500);
	for (var i = 0; i < totalCubes; i++) {
		coords = computeCubePosition(i, dT, totalCubes, orbitRadius);
		cubes[i].position.set(coords.x, coords.y, coords.z);
		cubes[i].rotation.x += dT / 256 * 1;
		cubes[i].rotation.y += dT / 256 * 0.3;
		cubes[i].rotation.z += dT / 256 * 0.7;
	}
	sphere.position.set(0, 0, Math.sin(tinytic.total() / 4096) * 32);
};

var animationLoop = function animationLoop() {
	if (!isRunning) {
		return;
	}
	requestAnimationFrame(animationLoop);
	computeModel();
	renderer.render(scene, camera);
};


window.insomnia = {
	on: function() {
		isRunning = true;
		document.body.appendChild(renderer.domElement);
		animationLoop();
	},
	off: function() {
		isRunning = false;
		document.body.removeChild(renderer.domElement);
	}
};
window.insomnia.on();
