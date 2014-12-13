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
var rotation = 0;
var getPhi = function(i, rotation) {
	return 2 * Math.PI / totalCubes * i + rotation;
}
var computePosition = function(i, radius, rotation, z) {
	if (!rotation) {
		rotation = 0;
	}
	phi = getPhi(i, rotation);
	x = Math.cos(phi) * radius;
	y = Math.sin(phi) * radius;
	cubes[i].position.set(x, y, z);
}
for (var i = 0; i < totalCubes; i++) {
	cubes[i] = new THREE.Mesh(geometry, material);
	computePosition(i, radius, 0, 0);
	scene.add(cubes[i]);
}

camera.position.z = 32;


var angularFreq = .0005;
var times = (function() {
	var then = new Date().getTime();
	var now = new Date().getTime();
	
	return {
		now: now,
		lap: function() {
			then = now;
			now = new Date().getTime();
		},
		diff: function() {
			return now - then;
		}
	};
}());
var getRotation = function(timeDiff) {
	return angularFreq * timeDiff % (Math.PI * 2);
}
function render() {
	var z;
	times.lap();
	requestAnimationFrame(render);
	rotation = getRotation(times.diff());
	var r = radius + 4 * Math.sin(times.now / 2048);
	for (var i = 0; i < totalCubes; i++) {
		z = getPhi(i, rotation);
		computePosition(i, r, rotation, z);
		cubes[i].rotation.x += .1;
		cubes[i].rotation.y += .03;
		cubes[i].rotation.z += .07;
	}
	renderer.render(scene, camera);
}
render();
