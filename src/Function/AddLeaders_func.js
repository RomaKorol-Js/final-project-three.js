import * as THREE from "three";

import { Ladder_step } from "../Classes/Ladder_step_class";

export let Add_Ladders = (
  steps = 11,
  X = 0,
  Y = 0.75,
  Z = -0.75,
  isRotated = false,
) => {
  const sign = isRotated ? -1 : 1;
  const LadderSteps = new THREE.Group();
  //   if it look at
  for (let i = 0; i < steps; i++) {
    const x = X + i * 0.125 * sign;
    const y = Y + i * 0.05;
    const z = Z;
    const stepLadder = new Ladder_step(
      0xf3eac6,
      0xc2854e,
      0.1,
      0.1,
      0.7,
      isRotated,
    );
    stepLadder.position.set(x, y, z);
    LadderSteps.add(stepLadder);
  } // look at coridor

  //   for (let i = 0; i < steps; i++) {
  //     const x = 0 + i * 0.1;
  //     const y = (0.75 + i * 0.1) * -1;
  //     const z = -0.75;
  //     const stepLadder = new Ladder_step(0xf3eac6, 0xc2854e, 0.1, 0.1, 0.5);
  //     stepLadder.position.set(x, y, z);
  //     LadderSteps.add(stepLadder);
  //   } // look at kithen but a little bit broken
  //   for (let i = 0; i < steps; i++) {
  //     const x = X + i * 0.125 *-1;
  //     const y = Y + i * 0.05;
  //     const z = Z;
  //     const stepLadder = new Ladder_step(0xf3eac6, 0xc2854e, 0.1, 0.1, 0.5, true);
  //     stepLadder.position.set(x, y, z);
  //     LadderSteps.add(stepLadder);
  //   } // look at kithen but a little bit broken
  return LadderSteps;
};
