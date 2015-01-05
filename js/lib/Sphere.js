var THREE = require('three');

var geometry = new THREE.SphereGeometry(4, 32, 32);

var attributes = {
  displacement: {
    type: 'f', // a float
    value: [] // an empty array
  }
};

var vertexShader = 'attribute float displacement;' +
  'varying vec3 vNormal;' +
  'void main() {' +
    'vNormal = normal;' +
    'vec3 newPosition = position + ' +
      'normal *' +
      'vec3(displacement);' +
    'gl_Position = projectionMatrix *' +
      'modelViewMatrix *' +
      'vec4(newPosition,1.0);' +
  '}';

var fragmentShader = 'varying vec3 vNormal;' +
  'void main() {' +
    'vec3 light = vec3(0.5,0.2,1.0);' +
    'light = normalize(light);' +
    'float dProd = max(0.0, dot(vNormal, light));' +
    'gl_FragColor = vec4(dProd, dProd, dProd, 1.0);' +
  '}';

console.log(geometry.vertices.length);
for(var v = 0; v < geometry.vertices.length; v++) {
  attributes.displacement.value.push((1 - Math.random()) * 2);
}

var shaderMaterial = new THREE.ShaderMaterial({
  attributes: attributes,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});


module.exports = function() {
  return new THREE.Mesh(geometry, shaderMaterial);
};
