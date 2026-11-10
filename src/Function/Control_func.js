import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { HeartMaterial } from "../Shaders/HeartMaterial";
const heartColours = [
  [1, 0, 0],
  [0, 1, 1],
  [0, 0, 1],
  [0, 1, 0],
  [1, 1, 0],
  [1, 0, 1],
  [1, 0.5, 0],
];
const movementKeys = new Set([
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "Space",
  "KeyC",
  "KeyQ",
  "KeyH",
]);

export function createWalkControls(
  camera,
  canvas,
  playerBody,
  playerRadius,
  player_heart,
  pauseScreenText,
) {
  const controls = new PointerLockControls(camera, canvas);
  const pressedKeys = new Set();
  const moveSpeed = 2;
  let heartColour = 0;
  let heartRange = 0.5;
  let tempSpeed = 2;
  const jumpSpeed = 3.5;
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const movement = new THREE.Vector3();
  let jumpRequested = false;
  let colourChangeRequested = false;
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
    if (event.code === "KeyC" && !event.repeat) colourChangeRequested = true;
  });

  document.addEventListener("keyup", (event) => {
    pressedKeys.delete(event.code);
  });
  document.addEventListener("mousewheel", (event) => {
    console.log(heartRange);
    if (event.deltaY < 0) {
      heartRange += 0.01;
    } else {
      heartRange -= 0.01;
    }
  });
  controls.addEventListener("lock", () => {
    pauseScreenText.visible = false;
  });
  controls.addEventListener("unlock", () => {
    pauseScreenText.visible = true;
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
      if (pressedKeys.has("KeyH")) {
        const spawnDirection = new THREE.Vector3();
        camera.getWorldDirection(spawnDirection);

        player_heart.position
          .copy(camera.position)
          .addScaledVector(spawnDirection, heartRange);
        player_heart.rotation.copy(camera.rotation);

        player_heart.visible = true;
      }
      if (pressedKeys.has("KeyC") && colourChangeRequested) {
        HeartMaterial.uniforms.Colour_Data.value.set(
          ...heartColours[heartColour % heartColours.length],
        );
        colourChangeRequested = false;
        heartColour++;
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
