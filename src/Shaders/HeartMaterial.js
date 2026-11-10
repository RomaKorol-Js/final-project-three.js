import * as THREE from "three";

export const HeartMaterial = new THREE.ShaderMaterial({
  uniforms: {
    fluidData: { value: 0.0 },
    Colour_Data: { value: new THREE.Vector3(0, 0, 0) },
  },
  vertexShader: `
  void main(){
  vec3 newPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1);
  }
  `,

  fragmentShader: `
  uniform float fluidData; 
  uniform vec3 Colour_Data; 
  void main(){
  float pulse = 0.9 + 0.075 * sin(fluidData * 3.0);
  
  vec3 finalColor = Colour_Data * pulse;
  gl_FragColor = vec4(finalColor, 1.0);
  }
  `,
});
