var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 32;

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true
});

var cubes = [];
var totalCubes = 32;
var radius = 16;

var getPhi = function(i, rotation) {
	return 2 * Math.PI / totalCubes * i + rotation;
}
var getRotation = function(timeDiff) {
	var angularFreq = .000005;
	return angularFreq * timeDiff % (Math.PI * 2);
}
var rotation = 0;
var getCoords = function(phi, radius, timeDiff) {
	rotation += getRotation(timeDiff);
	x = Math.cos(phi + rotation) * radius;
	y = Math.sin(phi + rotation) * radius;
	
	return {
		x: x,
		y: y,
		z: phi
	};
};

//initialise
for (var i = 0; i < totalCubes; i++) {
	cubes[i] = new THREE.Mesh(geometry, material);
	scene.add(cubes[i]);
}

var times = (function() {
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



function render() {
	//dev- it's no longer rotating!!
	requestAnimationFrame(render);
	var coords;
	var phi;
	var timeDiff = times.lap();
	//var pulsationRate = .001;
	//var r = radius + 4 * Math.sin(timeDiff * pulsationRate);
	for (var i = 0; i < totalCubes; i++) {
		phi = getPhi(i, 0);
		coords = getCoords(phi, radius, timeDiff);
		cubes[i].position.set(coords.x, coords.y, phi);
		cubes[i].rotation.x += .1;
		cubes[i].rotation.y += .03;
		cubes[i].rotation.z += .07;
	}
	renderer.render(scene, camera);
}
render();
