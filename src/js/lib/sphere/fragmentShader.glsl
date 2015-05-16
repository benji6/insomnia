varying vec3 vNormal;
uniform vec3 color;
void main() {
	vec3 light = vec3(0.5, 0.2, 1.0);
	light = normalize(light);
	float dProd = dot(vNormal, light) * 0.5 + 0.5;
	gl_FragColor = vec4(vec3(dProd) * vec3(color), 1.0);
}

#pragma glslify: export(main)
