import { Pillars_ladder } from "../Classes/Ladder_pillar_class";

export const Ladder_pillars_creator_func = (
  steps,
  X,
  Y,
  Z,
  X_multyplier = 0,
  Y_multiplier = 0,
  Z_multyplier = 0,
  scene,
) => {
  for (let i = 0; i < steps; i++) {
    const x = X + i * X_multyplier; //0.2
    const y = Y + i * Y_multiplier;
    const z = Z + i * Z_multyplier;
    const pillar = new Pillars_ladder(0xc2854e, 0xf3eac6);
    pillar.position.set(x, y, z);
    if (Z_multyplier) {
      pillar.rotateY(133.5);
    }
    scene.add(pillar);
  }
};
