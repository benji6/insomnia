var THREE = require('three');
var tinytic = require('tinytic');

var Cube = require('./lib/Cube.js');
var Sphere = require('./lib/Sphere.js');
var light = require('./lib/light.js');

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

var getPhi = function(i, timeDiff, phiThen) {
	//if getting initial phi
	if (phiThen === undefined) {
		return 2 * Math.PI / totalCubes * i;
	}

	var angularFreq = 0.0005;
	var rotation = angularFreq * timeDiff;
	var phiNow = phiThen + rotation;
	//keep phi between 0 and 2PI
	if (phiNow > 2 * Math.PI) {
		phiNow = phiNow % Math.PI;
	}

	return phiNow;
};

var getZ = function(phi) {
	var z = 8 * Math.sin(phi * 8);
	return z;
};

var getCoords = function(phi, orbitRadius, timeDiff) {
	return {
		x: Math.cos(phi) * orbitRadius,
		y: Math.sin(phi) * orbitRadius,
		z: getZ(phi)
	};
};

var isRunning;
var phiThens = [];

var computeModel = function() {
	var coords;
	var phi;
	var timeDiff = tinytic.toc(500);
	//var pulsationRate = .001;
	//var r = orbitRadius + 4 * Math.sin(timeDiff * pulsationRate);
	for (var i = 0; i < totalCubes; i++) {
		phi = getPhi(i, timeDiff, phiThens[i]);
		phiThens[i] = phi;
		coords = getCoords(phi, orbitRadius, timeDiff);
		cubes[i].position.set(coords.x, coords.y, coords.z);
		cubes[i].rotation.x += 0.1;
		cubes[i].rotation.y += 0.03;
		cubes[i].rotation.z += 0.07;
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
