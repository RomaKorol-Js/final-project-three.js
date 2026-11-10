import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const font = await new FontLoader().loadAsync(
  `${import.meta.env.BASE_URL}Fonts/Helvetiker_regular.typeface.json`,
);

export const CreateTextWithBackground_func = (
  x,
  y,
  z,
  text_data,
  scene,
  background_colour = 0xffaaaa,
) => {
  const background = new THREE.Mesh(
    new THREE.BoxGeometry(x * 2.25, y / 1.35, 0.1),
    new THREE.MeshBasicMaterial({ color: background_colour }),
  );
  CreateSentenses_func(x, y, z, text_data, scene);
  background.position.set(0, y / 1.25, z);
  scene.add(background);
};

export const CreateText_func = (x, y, z, text_data, scene) => {
  const text = new THREE.Mesh(
    new TextGeometry(`${text_data}`, { font, size: 0.075, depth: 0.02 }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
  );

  text.position.set(x, y, z);
  scene.add(text);
};
export const CreateSentenses_func = (x, y, z, text_data, scene) => {
  const sentense = text_data.split("|");
  for (let i = 0; i < sentense.length; i++) {
    CreateText_func(x, y - 0.1 * i, z, sentense[i], scene);
  }
};
