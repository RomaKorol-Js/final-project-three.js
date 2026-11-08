import * as THREE from "three";
import { ThreeMFLoader } from "three/examples/jsm/Addons.js";

export class Frame extends THREE.Group {
  constructor(
    Frame_borders_colour,
    Frame_inside_colour,
    x,
    y,
    z,
    proportion_x = 1.3,
    position_y = 1.3,
  ) {
    super();
    const Frame_border_material = new THREE.MeshLambertMaterial({
      color: Frame_borders_colour,
    });
    const Frame_inside_material = new THREE.MeshLambertMaterial({
      color: Frame_inside_colour,
    });

    const Frame_border = new THREE.Mesh(
      new THREE.BoxGeometry(x, y, z),
      Frame_border_material,
    );
    const Frame_inside = new THREE.Mesh(
      new THREE.BoxGeometry(x / proportion_x, y / position_y, z),
      Frame_inside_material,
    );
    Frame_inside.position.z = 0.001;
    this.add(Frame_border, Frame_inside);
  }
}
