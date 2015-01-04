var THREE = require('three');

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(8, 8, 4).normalize();

module.exports.ambientLight = new THREE.AmbientLight(0x000044);
module.exports.directionalLight = directionalLight;
