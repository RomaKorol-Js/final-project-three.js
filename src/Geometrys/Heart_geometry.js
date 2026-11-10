import * as THREE from "three";
const Heartshape = new THREE.Shape();

Heartshape.moveTo(0, 0.25);
Heartshape.bezierCurveTo(0, 0.25, -0.5, 0.65, -0.5, 0.1);
Heartshape.bezierCurveTo(-0.5, -0.2, 0, -0.45, 0, -0.45);
Heartshape.bezierCurveTo(0, -0.45, 0.5, -0.2, 0.5, 0.1);
Heartshape.bezierCurveTo(0.5, 0.65, 0, 0.25, 0, 0.25);
export const HeartGeometry = new THREE.ExtrudeGeometry(Heartshape, {
  depth: 0.08,
  bevelEnabled: true,
});
