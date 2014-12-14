var THREE = require('three.js');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 64;
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);

var createMaterial = function() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var material = new THREE.MeshLambertMaterial({
		color: 'rgb(' + r + ', ' + g + ', ' + b + ')'
	});
	
	return material;
}

var ambientLight = new THREE.AmbientLight(0x000044);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(16, 16, 16).normalize();
scene.add(directionalLight);
      
var cubes = [];
var totalCubes = 64;
var radius = 16;

var getPhi = function(i, timeDiff, phiThen) {
	//if getting initial phi
	if (phiThen === undefined) {
		return 2 * Math.PI / totalCubes * i;
	}

	var angularFreq = .0005;
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
}

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

var stopWatch = (function() {
	var then = new Date().getTime();
	var now = new Date().getTime();
	
	return {
		lap: function() {
			then = now;
			now = new Date().getTime();
			return now - then;
		}
	};
}());


var phiThens = [];
function render() {
	requestAnimationFrame(render);
	var coords;
	var phi;
	var timeDiff = stopWatch.lap();
	//var pulsationRate = .001;
	//var r = radius + 4 * Math.sin(timeDiff * pulsationRate);
	for (var i = 0; i < totalCubes; i++) {
		phi = getPhi(i, timeDiff, phiThens[i]);
		phiThens[i] = phi;
		coords = getCoords(phi, radius, timeDiff);
		cubes[i].position.set(coords.x, coords.y, coords.z);
		cubes[i].rotation.x += .1;
		cubes[i].rotation.y += .03;
		cubes[i].rotation.z += .07;
	}
	renderer.render(scene, camera);
}
render();
