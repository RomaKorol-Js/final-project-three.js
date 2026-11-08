import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

const movementKeys = new Set([
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "Space",
  "KeyC",
  "KeyQ",
]);

export function createWalkControls(camera, canvas, playerBody, playerRadius) {
  const controls = new PointerLockControls(camera, canvas);
  const pressedKeys = new Set();
  const moveSpeed = 2;
  let tempSpeed = 2;
  const jumpSpeed = 3.5;
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const movement = new THREE.Vector3();
  let jumpRequested = false;

  const stopHorizontalMovement = () => {
    pressedKeys.clear();
    jumpRequested = false;
    playerBody.velocity.x = 0;
    playerBody.velocity.z = 0;
  };

  canvas.addEventListener("click", () => controls.lock());
  controls.addEventListener("unlock", stopHorizontalMovement);
  window.addEventListener("blur", stopHorizontalMovement);

  document.addEventListener("keydown", (event) => {
    if (!movementKeys.has(event.code)) return;

    event.preventDefault();
    pressedKeys.add(event.code);
    if (event.code === "Space" && !event.repeat) jumpRequested = true;
  });

  document.addEventListener("keyup", (event) => {
    pressedKeys.delete(event.code);
  });

  return {
    update() {
      if (!controls.isLocked) {
        playerBody.velocity.x = 0;
        playerBody.velocity.z = 0;
        jumpRequested = false;
        return;
      }

      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();
      right.set(-forward.z, 0, forward.x);

      if (pressedKeys.has("KeyQ")) {
        tempSpeed = moveSpeed * 0.5;
      } else {
        tempSpeed = moveSpeed;
      }
      if (pressedKeys.has("KeyC")) {
        console.log(playerBody);
      }
      movement
        .set(0, 0, 0)
        .addScaledVector(
          forward,
          Number(pressedKeys.has("KeyW")) - Number(pressedKeys.has("KeyS")),
        )
        .addScaledVector(
          right,
          Number(pressedKeys.has("KeyD")) - Number(pressedKeys.has("KeyA")),
        );

      if (movement.lengthSq() > 0) movement.normalize();

      playerBody.velocity.x = movement.x * tempSpeed;
      playerBody.velocity.z = movement.z * tempSpeed;

      if (jumpRequested) {
        if (
          playerBody.position.y <= playerRadius + 0.05 &&
          playerBody.velocity.y <= 0.5
        ) {
          playerBody.velocity.y = jumpSpeed;
          playerBody.wakeUp();
        }
        jumpRequested = false;
      }
    },
  };
}
