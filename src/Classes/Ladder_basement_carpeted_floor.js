import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export class Ladder_basement_carpeted_floor extends THREE.Group {
  constructor(basement_carpeted_floor_outside, basement_carpeted_floor_inside) {
    super();

    const Ladder_basement_carpeted_floor_outside_material =
      new THREE.MeshLambertMaterial({
        color: basement_carpeted_floor_outside,
        emissive: basement_carpeted_floor_outside,
        emissiveIntensity: 0.45,
      });
    const Ladder_basement_carpeted_floor_inside_material =
      new THREE.MeshLambertMaterial({
        color: basement_carpeted_floor_inside,
        emissive: basement_carpeted_floor_inside,
        emissiveIntensity: 0.45,
      });

    const Ladder_basement_carpeted_floor_outside = new THREE.Mesh(
      new THREE.BoxGeometry(0.96, 0.1, 1.4),
      Ladder_basement_carpeted_floor_outside_material,
    );
    const Ladder_basement_carpeted_floor_inside = new THREE.Mesh(
      new RoundedBoxGeometry(0.9, 0.11, 1.25, 4, 0.2),
      Ladder_basement_carpeted_floor_inside_material,
    );
    const Ladder_basement_carpeted_floor_inside_hole = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.12, 0.2),
      Ladder_basement_carpeted_floor_outside_material,
    );
    Ladder_basement_carpeted_floor_inside_hole.position.set(0.32, 0, 0);

    this.add(
      Ladder_basement_carpeted_floor_outside,
      Ladder_basement_carpeted_floor_inside,
      Ladder_basement_carpeted_floor_inside_hole,
    );
  }
}
