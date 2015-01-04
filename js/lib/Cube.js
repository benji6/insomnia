var THREE = require('three');

var geometry = new THREE.BoxGeometry(1, 1, 1);

var createMaterial = function() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return new THREE.MeshLambertMaterial({
    color: 'rgb(' + r + ', ' + g + ', ' + b + ')'
  });
};

module.exports = function() {
  return new THREE.Mesh(geometry, createMaterial());
};
