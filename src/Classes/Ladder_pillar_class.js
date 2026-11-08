import * as THREE from "three";

export class Pillars_ladder extends THREE.Group {
  constructor(pilar_base_color, pilar_top_color) {
    super();
    const Pliar_base_materials = new THREE.MeshLambertMaterial({
      color: pilar_base_color,
    });
    const Pilar_top_materials = new THREE.MeshLambertMaterial({
      color: pilar_top_color,
    });

    const Pillar_base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.15, 8),
      Pliar_base_materials,
    );
    Pillar_base.position.set(0, -0.1, 0);
    const Pillar_top = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.25, 6),
      //   new THREE.BoxGeometry(0.3, 0.075, 0.1),
      Pilar_top_materials,
    );
    Pillar_base.renderOrder = 0;
    Pillar_top.renderOrder = 1;
    Pillar_top.rotateZ(133.5);
    Pillar_base.position.y = -0.175;
    Pillar_top.position.y = -0.1;
    this.add(Pillar_base, Pillar_top);
  }
}
