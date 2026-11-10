import CANNON from "cannon";

export const addStairTreads = (
  steps,
  startX,
  startY,
  z,
  isRotated,
  stairCollider,
) => {
  const direction = isRotated ? -1 : 1;
  const treadShape = new CANNON.Box(new CANNON.Vec3(0.0625, 0.025, 0.3325));

  for (let i = 0; i < steps; i++) {
    stairCollider.addShape(
      treadShape,
      new CANNON.Vec3(startX + i * 0.125 * direction, startY + i * 0.05, z),
    );
  }
};
