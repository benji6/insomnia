var THREE = require('three');
var tinytic = require('tinytic');

var sphere = require('./lib/sphere.js');
var light = require('./lib/light.js');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 64;
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.className = "fullscreen";

var geometry = new THREE.BoxGeometry(1, 1, 1);

var createMaterial = function() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var material = new THREE.MeshLambertMaterial({
		color: 'rgb(' + r + ', ' + g + ', ' + b + ')'
	});

	return material;
};

scene.add(sphere);

scene.add(light.ambientLight);
scene.add(light.directionalLight);


var cubes = [];
var totalCubes = 64;
var radius = 16;

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

var getCoords = function(phi, radius, timeDiff) {
	x = Math.cos(phi) * radius;
	y = Math.sin(phi) * radius;
	z = getZ(phi);

	return {
		x: x,
		y: y,
		z: z
	};
};

//initialise
var material;
for (var i = 0; i < totalCubes; i++) {
	material = createMaterial();
	cubes[i] = new THREE.Mesh(geometry, material);
	scene.add(cubes[i]);
}

var isRunning;
var phiThens = [];
function render() {
	if (!isRunning) {
		return;
	}
	requestAnimationFrame(render);
	var coords;
	var phi;
	var timeDiff = tinytic.toc(500);
	//var pulsationRate = .001;
	//var r = radius + 4 * Math.sin(timeDiff * pulsationRate);
	for (var i = 0; i < totalCubes; i++) {
		phi = getPhi(i, timeDiff, phiThens[i]);
		phiThens[i] = phi;
		coords = getCoords(phi, radius, timeDiff);
		cubes[i].position.set(coords.x, coords.y, coords.z);
		cubes[i].rotation.x += 0.1;
		cubes[i].rotation.y += 0.03;
		cubes[i].rotation.z += 0.07;
	}
	renderer.render(scene, camera);
}

var run = function() {
	isRunning = true;
	document.body.appendChild(renderer.domElement);
	render();
};
var off = function() {
	isRunning = false;
	document.body.removeChild(renderer.domElement);
};

window.insomnia = {
	on: run,
	off: off
};
window.insomnia.on();
