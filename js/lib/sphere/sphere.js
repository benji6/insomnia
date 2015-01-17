var THREE = require('three');
var glslify = require('glslify');

var geometry = new THREE.SphereGeometry(4, 32, 32);

var myShader = glslify({
  vertex: './vertexShader.glsl',
  fragment: './fragmentShader.glsl',
  sourceOnly: true
});

var attributes = {
  displacement: {
    type: 'f', // a float
    value: []
  }
};

var uniforms = {
  amplitude: {
    type: 'f', // a float
    value: 0
  },
  color: {
    type: "c",
    value: new THREE.Color(0xcc11ee)
  }
};

var v;

for (v = 0; v < geometry.vertices.length; v++) {
  attributes.displacement.value.push((1 - Math.random()) * 2);
}

var shaderMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  attributes: attributes,
  vertexShader: myShader.vertex,
  fragmentShader: myShader.fragment
});

var sphere = new THREE.Mesh(geometry, shaderMaterial);
module.exports.model = sphere;
module.exports.compute = function(dT, totalT) {
  uniforms.color.value.offsetHSL(dT / 16384, 0, 0);
  uniforms.amplitude.value = Math.sin(totalT / 12288) * 2;
  sphere.rotation.x += dT / 256 * 0.13;
  sphere.rotation.y += dT / 256 * 0.06;
  sphere.rotation.z += dT / 256 * 0.1;
  sphere.position.set(0, 0, Math.sin(totalT / 4096) * 48);
};
