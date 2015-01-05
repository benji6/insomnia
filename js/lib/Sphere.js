var THREE = require('three');

var geometry = new THREE.SphereGeometry(8, 32, 32);

var vertexShader = 'varying vec3 vNormal;' +
  'void main() {' +
    'vNormal = normal;' +
    'gl_Position = projectionMatrix *' +
      'modelViewMatrix *' +
      'vec4(position,1.0);' +
  '}';

var fragmentShader = 'varying vec3 vNormal;' +
  'void main() {' +
    'vec3 light = vec3(0.5,0.2,1.0);' +
    'light = normalize(light);' +
    'float dProd = max(0.0, dot(vNormal, light));' +
    'gl_FragColor = vec4(dProd, dProd, dProd, 1.0);' +
  '}';

var shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

module.exports = function() {
  return new THREE.Mesh(geometry, shaderMaterial);
};
