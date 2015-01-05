var THREE = require('three');

var material = new THREE.MeshPhongMaterial({
  color: 0xCCEE00
});

var geometry = new THREE.SphereGeometry(8, 32, 32);

module.exports = function() {
  return new THREE.Mesh(geometry, material);
};
