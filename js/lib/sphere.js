var THREE = require('three');

var sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0xCCEE00
});

module.exports = new THREE.Mesh(new THREE.SphereGeometry(8, 32, 32),sphereMaterial);
