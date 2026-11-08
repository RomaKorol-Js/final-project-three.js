import * as THREE from "three";

export class Ladder_step extends THREE.Group {
  constructor(step_colour_outside, step_colour_inside, x, y, z, isRotated) {
    super();
    const Ladder_step_inside_material = new THREE.MeshLambertMaterial({
      color: step_colour_inside,
    });
    const Ladder_step_outside_material = new THREE.MeshLambertMaterial({
      color: step_colour_outside,
    });

    const sign = isRotated ? 1 : -1;

    const Ladder_step_outside = new THREE.Mesh(
      new THREE.BoxGeometry(x * 1.25, y / 2, z * 0.95),
      Ladder_step_outside_material,
    );
    //
    const Ladder_step_inside = new THREE.Mesh(
      new THREE.BoxGeometry(x * 1.25, 0.01, z * 0.7),
      Ladder_step_inside_material,
    );
    const Ladder_step_inside_vertical = new THREE.Mesh(
      new THREE.BoxGeometry((x * 1.25) / 2, 0.01, z * 0.7),
      Ladder_step_inside_material,
    );
    Ladder_step_inside.position.set(-0.1 + x, -0.075 + y, 0);

    Ladder_step_inside_vertical.position.set(sign * (-0.035 + x), 0.1 - y, 0);

    Ladder_step_inside_vertical.rotation.z = THREE.MathUtils.degToRad(90);
    this.add(
      Ladder_step_inside,
      Ladder_step_outside,
      Ladder_step_inside_vertical,
    );
  }
}
