import CANNON from "cannon";
import { world } from "../scene";
import { floorPhysicsMaterial } from "../scene";
export const addFloorCollider = (width, depth, x, z) => {
  const collider = new CANNON.Body({
    mass: 0,
    material: floorPhysicsMaterial,
  });
  collider.addShape(
    new CANNON.Box(new CANNON.Vec3(width / 2, 0.06, depth / 2)),
  );
  collider.position.set(x, -0.04, z);
  world.addBody(collider);
};
