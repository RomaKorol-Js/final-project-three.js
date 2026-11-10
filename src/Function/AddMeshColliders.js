import * as THREE from "three";
import CANNON from "cannon";
import { world } from "../scene";
export const addMeshColliders = (root, material) => {
  const roots = Array.isArray(root) ? root : [root];
  roots.forEach((object) => object.updateWorldMatrix(true, true));

  const colliderBody = new CANNON.Body({ mass: 0, material });
  const bounds = new THREE.Box3();
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  roots.forEach((rootObject) => {
    rootObject.traverse((object) => {
      if (!object.isMesh) return;

      bounds.setFromObject(object);
      bounds.getCenter(center);
      bounds.getSize(size);

      if (size.x === 0 || size.y === 0 || size.z === 0) return;

      colliderBody.addShape(
        new CANNON.Box(
          new CANNON.Vec3(size.x / 2 + 0.075, size.y / 2, size.z / 2 + 0.075),
        ),
        new CANNON.Vec3(center.x, center.y, center.z),
      );
    });
  });

  if (colliderBody.shapes.length > 0) world.addBody(colliderBody);
};
