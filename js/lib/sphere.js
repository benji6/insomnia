var THREE = require('three');

var vertexShader = require('./vertexShader.js');
var fragmentShader = require('./fragmentShader.js');

var geometry = new THREE.SphereGeometry(4, 32, 32);

var attributes = {
  displacement: {
    type: 'f', // a float
    value: [] // an empty array
  }
};
var uniforms = {
  amplitude: {
    type: 'f', // a float
    value: 0
  }
};

for(var v = 0; v < geometry.vertices.length; v++) {
  attributes.displacement.value.push((1 - Math.random()) * 2);
}

var shaderMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  attributes: attributes,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

var sphere = new THREE.Mesh(geometry, shaderMaterial);
module.exports.model = sphere;
module.exports.compute = function(t) {
  uniforms.amplitude.value = Math.sin(t) * 2;
};
