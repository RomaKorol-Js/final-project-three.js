import * as THREE from "three";

export function addBorder(mesh, borderColor) {
  const edges = new THREE.EdgesGeometry(mesh.geometry);
  const borderMaterial = new THREE.LineBasicMaterial({ color: borderColor });
  const borderLines = new THREE.LineSegments(edges, borderMaterial);
  mesh.add(borderLines);
}
