import * as THREE from "three";
import CANNON from "cannon";
import { Pillars_ladder } from "./Classes/Ladder_pillar_class";
import { Frame } from "./Classes/Frame_class";
import { Add_Ladders } from "./Function/AddLeaders_func";
import { createWalkControls } from "./Function/Control_func";
import { Ladder_basement_carpeted_floor } from "./Classes/Ladder_basement_carpeted_floor";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
);

camera.position.set(0, 0.95, 1.3);
// camera.lookAt(0, 0, 0);

scene.add(camera);

const canvas = document.querySelector("canvas.webgl");

const render = new THREE.WebGLRenderer({
  canvas: canvas,
});
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFShadowMap;

//Light

const lampLight = new THREE.PointLight("#FFF4C9", 7.5, 7.5);
lampLight.position.set(0.95, 1, -1.4);
scene.add(lampLight);

const light = new THREE.DirectionalLight(0xffffff, 1.75);
light.position.set(2, 5, 3);
light.castShadow = true;
scene.add(light);

//Floor

const textureLoader = new THREE.TextureLoader();

const floorShape = new THREE.Shape();
floorShape.moveTo(-2.5, -2);
floorShape.lineTo(2.5, -2);
floorShape.lineTo(2.5, 2);
floorShape.lineTo(-2.5, 2);
floorShape.closePath();

const floorHole = new THREE.Path();
floorHole.moveTo(-1.45, 0.1);
floorHole.lineTo(-1.45, 1.5);
floorHole.lineTo(0.75, 1.5);
floorHole.lineTo(0.75, 0.1);

floorShape.holes.push(floorHole);

const floorGeometry = new THREE.ShapeGeometry(floorShape);

const floorColorTexture = textureLoader.load(
  `${import.meta.env.BASE_URL}Texture/Floor/floor.png`,
);
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.anisotropy = render.capabilities.getMaxAnisotropy();
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.repeat.set(2, 2);

const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorColorTexture,
  side: THREE.DoubleSide,
  color: 0xf5c0c8,
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);
//Walls

const room_1_fundament = new THREE.Group();

const entrance_right_wall = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.5, 0.5),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
entrance_right_wall.position.set(1.75, 0.75, 1.75);

const entrance_left_wall = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.5, 0.5),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
entrance_left_wall.position.set(-1.75, 0.75, 1.75);

const kithen_bottom_wall = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 0.25),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
kithen_bottom_wall.position.set(-2, 0.75, 1.375);

const corridor_bottom_wall = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 0.25),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
corridor_bottom_wall.position.set(2, 0.75, 1.375);

const ladder_wall = new THREE.Mesh(
  new THREE.BoxGeometry(5, 2.5, 0.5),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
ladder_wall.position.set(0, 0.25, -1.75);

const kithen_sided_wall = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 1.5, 1.5),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
kithen_sided_wall.position.set(-2.25, 0.75, -0.75);

const corridor_sided_wall = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 1.5, 1.5),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
corridor_sided_wall.position.set(2.25, 0.75, -0.75);

const roof = new THREE.Mesh(
  new THREE.BoxGeometry(5, 0.25, 4),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
roof.position.set(0, 1.6, 0);
room_1_fundament.add(
  entrance_right_wall,
  entrance_left_wall,
  kithen_bottom_wall,
  corridor_bottom_wall,
  ladder_wall,
  corridor_sided_wall,
  kithen_sided_wall,
  roof,
);

function addBorder(mesh, borderColor) {
  // add to function
  const edges = new THREE.EdgesGeometry(mesh.geometry);
  const borderMaterial = new THREE.LineBasicMaterial({ color: borderColor });
  const borderLines = new THREE.LineSegments(edges, borderMaterial);
  mesh.add(borderLines);
}
scene.add(room_1_fundament);
//Decoration (Must add painting and lenter that must have light)
const Decoration = new THREE.Group();

// const coridor_sided_box = new THREE.Mesh(
//   new THREE.BoxGeometry(0.5, 0.25, 0.25),
//   new THREE.MeshBasicMaterial({ color: 0xf5d79e }),
// );
// coridor_sided_box.position.set(1.7, 0.15, -1.35);

// const kithen_sided_box_with_plant = new THREE.Mesh(
//   new THREE.BoxGeometry(0.3, 0.3, 0.4),
//   new THREE.MeshBasicMaterial({ color: 0x513001 }),
// );
// kithen_sided_box_with_plant.position.set(-1.75, 0.15, -1.2);

const small_frame = new Frame(0xc2854e, 0xf3eac6, 0.3, 0.4, 0.05);
small_frame.position.set(1.4, 0.75, -1.5);

const wide_frame = new Frame(0xc2854e, 0xf3eac6, 1.5, 0.5, 0.05, 1.05, 1.2);
wide_frame.position.set(-0.25, 0.75, -1.5);

Decoration.add(
  // coridor_sided_box,
  // kithen_sided_box_with_plant,
  small_frame,
  wide_frame,
);

Decoration.children.forEach((decoration) => {
  addBorder(decoration, 0xc2854e);
});
scene.add(Decoration);

//Ladder
const Ladder_pillars = new THREE.Group();
// I can make function that will make it, so it wont be too much of reapeated code
for (let i = 0; i < 11; i++) {
  const x = -1.35 + i * 0.2;
  const y = 0.25;
  const z = -0.025;
  const pillar = new Pillars_ladder(0xc2854e, 0xf3eac6);
  pillar.position.set(x, y, z);
  Ladder_pillars.add(pillar);
}

for (let i = 0; i < 9; i++) {
  const x = -1.5;
  const y = 0.25;
  const z = -1.35 + i * 0.145;
  const pillar = new Pillars_ladder(0xc2854e, 0xf3eac6);
  pillar.rotateY(133.5);
  pillar.position.set(x, y, z);
  Ladder_pillars.add(pillar);
}

for (let i = 0; i < 4; i++) {
  const x = 0.8;
  const y = 0.25;
  const z = -0.65 + i * 0.145;
  const pillar = new Pillars_ladder(0xc2854e, 0xf3eac6);
  pillar.rotateY(133.5);
  pillar.position.set(x, y, z);
  Ladder_pillars.add(pillar);
}
scene.add(Ladder_pillars);

//stepladders

const Ladder_steps = Add_Ladders(11, -0.56, -0.53, -1.15, false);
const Ladder_steps_bottom = Add_Ladders(11, 0.775, -1.07, -0.455, true);

Ladder_pillars.add(Ladder_steps, Ladder_steps_bottom);
scene.add(Ladder_steps, Ladder_steps_bottom);

//basement
const Basment_fundament = new THREE.Group();

const wallShape = new THREE.Shape();
wallShape.moveTo(-2.25, -0.45); // left
wallShape.lineTo(1.5, -0.6); // right
wallShape.lineTo(0.9, 0.7); //upper
wallShape.closePath();

const basement_wall_under_ladder_geometry = new THREE.ExtrudeGeometry(
  wallShape,
  { depth: 0.035, bevelEnabled: false },
);

const basement_wall_under_ladder = new THREE.Mesh(
  basement_wall_under_ladder_geometry,
  new THREE.MeshLambertMaterial({ color: 0xf3eac6 }), // why its dont have colour
);
basement_wall_under_ladder.position.set(-0.1, -0.725, -0.825);

const Basement_ladder_carpeted_floor = new Ladder_basement_carpeted_floor(
  0xf3eac6,
  0xc2854e,
);
Basement_ladder_carpeted_floor.position.set(-0.95, -0.6, -0.8);

/*easier one */

const basement_wall_kithen_sided = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 0.75, 1.5),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
basement_wall_kithen_sided.position.set(-1.5, -0.39, -0.8);

const basment_wall_enterence_sided = new THREE.Mesh(
  new THREE.BoxGeometry(3, 1.25, 0.1),
  new THREE.MeshLambertMaterial({ color: 0xf6e7bd }),
);
basment_wall_enterence_sided.position.set(0, -0.635, 0);
Basment_fundament.add(
  basement_wall_under_ladder,
  Basement_ladder_carpeted_floor,
  basement_wall_kithen_sided,
  basment_wall_enterence_sided,
);

scene.add(Basment_fundament);
// Shadows

const enableShadows = (root) => {
  root.traverse((object) => {
    if (!object.isMesh) return;

    object.castShadow = true;
    object.receiveShadow = true;
  });
};

room_1_fundament.traverse((object) => {
  if (!object.isMesh) return;
  enableShadows(object);
});

floor.receiveShadow = true;

Basment_fundament.traverse((object) => {
  if (!object.isMesh) return;
  enableShadows(object);
});
Basment_fundament.traverse((object) => {
  if (!object.isMesh) return;
  enableShadows(object);
});
Ladder_pillars.traverse((object) => {
  if (!object.isMesh) return;
  enableShadows(object);
});

//3d modules
const Base_Url = `${import.meta.env.BASE_URL}`;

const Url_Array = [
  `${Base_Url}Models/Vase_2/scene.gltf`,
  `${Base_Url}Models/Lamp/scene.gltf`,
  `${Base_Url}Models/Bookshelf/Bookshelf.gltf`,
  `${Base_Url}Models/Table/scene.gltf`,
];

const gltfLoader = new GLTFLoader();

gltfLoader.load(Url_Array[1], (gltf) => {
  const lamp = gltf.scene;

  lamp.traverse((object) => {
    if (!object.isMesh) return;

    const originalMaterials = Array.isArray(object.material)
      ? object.material
      : [object.material];

    const stylizedMaterials = originalMaterials.map((material) => {
      const color = material.name === "Brass" ? 0xebba43 : 0xf5d79e;

      return new THREE.MeshLambertMaterial({
        color,
        flatShading: true,
      });
    });

    object.material = Array.isArray(object.material)
      ? stylizedMaterials
      : stylizedMaterials[0];
  });

  lamp.scale.set(0.05, 0.1, 0.05);
  lamp.position.set(0.95, 0.6, -1.45);
  lamp.rotateY(THREE.MathUtils.degToRad(180));

  scene.add(lamp);
  addMeshColliders(lamp, wallPhysicsMaterial);
});
const applyFlatColor = (model, color) => {
  model.traverse((object) => {
    if (!object.isMesh) return;
    object.material = new THREE.MeshLambertMaterial({ color });
  });
};
gltfLoader.load(Url_Array[2], (gltf) => {
  const bookshelf = gltf.scene;
  applyFlatColor(bookshelf, 0xc2854e);
  bookshelf.scale.set(0.33, 0.25, 0.25);
  bookshelf.position.set(1.35, -0.35, -1.05);
  bookshelf.rotateY(THREE.MathUtils.degToRad(0));

  enableShadows(bookshelf);
  scene.add(bookshelf);
  addMeshColliders(bookshelf, wallPhysicsMaterial);
});

gltfLoader.load(Url_Array[3], (gltf) => {
  const table = gltf.scene;

  table.scale.set(0.5, 0.5, 1);
  table.position.set(-1.75, 0, -1.2);
  table.rotateY(THREE.MathUtils.degToRad(0));
  applyFlatColor(table, 0xf5d79e);
  enableShadows(table);
  scene.add(table);
  addMeshColliders(table, wallPhysicsMaterial);
});
gltfLoader.load(Url_Array[0], (gltf) => {
  const vase = gltf.scene;

  vase.scale.set(0.05, 0.05, 0.05);
  vase.position.set(-1.75, 0.31, -1.2);
  vase.rotateY(THREE.MathUtils.degToRad(0));

  enableShadows(vase);
  scene.add(vase);
  addMeshColliders(vase, wallPhysicsMaterial);
});
//small details
const bookColors = [0x8c3f39, 0x315b4a, 0xd4aa4c, 0x394b73];

for (let i = 0; i < 12; i++) {
  const book = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 0.12, 0.15),
    new THREE.MeshLambertMaterial({
      color: bookColors[i % bookColors.length],
    }),
  );

  book.position.set(1.43 + i * 0.04, 0.23, -1.3);
  scene.add(book);
}
for (let i = 0; i < 3; i++) {
  const book = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 0.12, 0.15),
    new THREE.MeshLambertMaterial({
      color: bookColors[i % bookColors.length],
    }),
  );

  book.position.set(1.53 + i * 0.04, 0.07, -1.3);
  scene.add(book);
}
//Other Room Blockers
const Fake_walls = new THREE.Group();

const Fake_wall_kithen = new THREE.Mesh(
  new THREE.BoxGeometry(0.25, 1.5, 1.25),
  new THREE.MeshBasicMaterial({ color: 0x000000 }),
);
Fake_wall_kithen.position.set(-2.4, 0.75, 0.625);
const Fake_wall_corridor = new THREE.Mesh(
  new THREE.BoxGeometry(0.25, 1.5, 1.25),
  new THREE.MeshBasicMaterial({ color: 0x000000 }),
);
Fake_wall_corridor.position.set(2.4, 0.75, 0.625);

const Fake_wall_enterence = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 0.25),
  new THREE.MeshBasicMaterial({ color: 0x000000 }),
);
Fake_wall_enterence.position.set(0, 0.75, 1.88);

const Fake_wall_basement = new THREE.Mesh(
  new THREE.BoxGeometry(0.25, 1.1, 0.75),
  new THREE.MeshBasicMaterial({ color: 0x000000 }),
);
Fake_wall_basement.position.set(1, -0.6, -0.45);
Fake_walls.add(
  Fake_wall_kithen,
  Fake_wall_corridor,
  Fake_wall_enterence,
  Fake_wall_basement,
);
scene.add(Fake_walls);
//Helpfull things and render

render.setSize(sizes.width, sizes.height);

render.render(scene, camera);
//Phics

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const playerRadius = 0.15;
const cameraEyeHeight = 0.44;
const playerMaterial = new CANNON.Material("player");
const floorPhysicsMaterial = new CANNON.Material("physics-floor");
const stairMaterial = new CANNON.Material("stairs");
const wallPhysicsMaterial = new CANNON.Material("walls");

const camera_box = new CANNON.Body({
  mass: 2.5,
  shape: new CANNON.Sphere(playerRadius),
  material: playerMaterial,
  position: new CANNON.Vec3(0, playerRadius + 0.01, 1.3),
});
camera_box.fixedRotation = true;
camera_box.updateMassProperties();
camera_box.linearDamping = 0.05;

world.addBody(camera_box);

const addFloorCollider = (width, depth, x, z) => {
  const collider = new CANNON.Body({
    mass: 0,
    material: floorPhysicsMaterial,
  });
  collider.addShape(
    new CANNON.Box(new CANNON.Vec3(width / 2, 0.06, depth / 2)),
  );
  collider.position.set(x, -0.04, z);
  world.addBody(collider);
};

addFloorCollider(5.2, 2.3, 0, 1.025);
addFloorCollider(1.05, 1.35, -1.975, -0.825);
addFloorCollider(1.75, 1.35, 1.625, -0.825);

const addMeshColliders = (root, material) => {
  const roots = Array.isArray(root) ? root : [root];
  roots.forEach((object) => object.updateWorldMatrix(true, true));

  const colliderBody = new CANNON.Body({ mass: 0, material });
  const bounds = new THREE.Box3();
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  roots.forEach((rootObject) => {
    rootObject.traverse((object) => {
      if (!object.isMesh) return;

      bounds.setFromObject(object);
      bounds.getCenter(center);
      bounds.getSize(size);

      if (size.x === 0 || size.y === 0 || size.z === 0) return;

      colliderBody.addShape(
        new CANNON.Box(
          new CANNON.Vec3(size.x / 2 + 0.075, size.y / 2, size.z / 2 + 0.075),
        ),
        new CANNON.Vec3(center.x, center.y, center.z),
      );
    });
  });

  if (colliderBody.shapes.length > 0) world.addBody(colliderBody);
};

addMeshColliders(room_1_fundament, wallPhysicsMaterial);
addMeshColliders(Ladder_pillars, wallPhysicsMaterial);
addMeshColliders(Fake_walls, wallPhysicsMaterial);
addMeshColliders(
  [basement_wall_kithen_sided, basment_wall_enterence_sided],
  wallPhysicsMaterial,
);

basement_wall_under_ladder.updateWorldMatrix(true, false);
const basementTriangleCollider = new CANNON.Body({
  mass: 0,
  material: wallPhysicsMaterial,
});
basementTriangleCollider.addShape(
  new CANNON.ConvexPolyhedron(
    [
      new CANNON.Vec3(-2.25, -0.45, 0),
      new CANNON.Vec3(1, -0.5, 0),
      new CANNON.Vec3(0.9, 0.7, 0),
      new CANNON.Vec3(-2.25, -0.45, 0.035),
      new CANNON.Vec3(1, -0.5, 0.035),
      new CANNON.Vec3(0.9, 0.7, 0.035),
    ],
    [
      [0, 2, 1],
      [3, 4, 5],
      [0, 1, 4, 3],
      [1, 2, 5, 4],
      [2, 0, 3, 5],
    ],
  ),
);
const basementTrianglePosition = new THREE.Vector3();
basement_wall_under_ladder.getWorldPosition(basementTrianglePosition);
basementTriangleCollider.position.copy(basementTrianglePosition);
world.addBody(basementTriangleCollider);

const basementLedderCarpetCollider = new CANNON.Body({
  mass: 0,
  material: stairMaterial,
});
basementLedderCarpetCollider.addShape(
  new CANNON.Box(new CANNON.Vec3(0.5, 0.055, 0.7)),
);
basementLedderCarpetCollider.position.set(-0.9, -0.6, -0.8);
world.addBody(basementLedderCarpetCollider);

const stairCollider = new CANNON.Body({ mass: 0, material: stairMaterial });
const addStairTreads = (steps, startX, startY, z, isRotated) => {
  const direction = isRotated ? -1 : 1;
  const treadShape = new CANNON.Box(new CANNON.Vec3(0.0625, 0.025, 0.3325));

  for (let i = 0; i < steps; i++) {
    stairCollider.addShape(
      treadShape,
      new CANNON.Vec3(startX + i * 0.125 * direction, startY + i * 0.05, z),
    );
  }
};

addStairTreads(11, -0.56, -0.53, -1.15, false);
addStairTreads(11, 0.85, -1.075, -0.455, true);
world.addBody(stairCollider);

const roofCollider = new CANNON.Body({
  mass: 0,
  material: wallPhysicsMaterial,
});
roofCollider.addShape(new CANNON.Box(new CANNON.Vec3(2.5, 0.125, 2)));
roofCollider.position.set(0, 1.6, 0);
world.addBody(roofCollider);

world.addContactMaterial(
  new CANNON.ContactMaterial(playerMaterial, floorPhysicsMaterial, {
    friction: 0,
    restitution: 0,
  }),
);
world.addContactMaterial(
  new CANNON.ContactMaterial(playerMaterial, stairMaterial, {
    friction: 0.05,
    restitution: 0.2,
  }),
);
world.addContactMaterial(
  new CANNON.ContactMaterial(playerMaterial, wallPhysicsMaterial, {
    friction: 0,
    restitution: 0,
  }),
);

const controls = createWalkControls(camera, canvas, camera_box, playerRadius);

//Shader
const HeartMaterial = new THREE.ShaderMaterial({
  uniforms: {
    fluidData: { value: 0.0 },
    Clour_Data: { value: new THREE.Vector3(0, 0, 0) },
  },
  vertexShader: `
  void main(){
  vec3 newPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1);
  }
  `,

  fragmentShader: `
  uniform float fluidData; 
  uniform vec3 Clour_Data; 
  void main(){
  float pulse = 0.9 + 0.075 * sin(fluidData * 3.0);
  
  vec3 finalColor = Clour_Data * pulse;
  gl_FragColor = vec4(finalColor, 1.0);
  }
  `,
});
const shape = new THREE.Shape();

shape.moveTo(0, 0.25);
shape.bezierCurveTo(0, 0.25, -0.5, 0.65, -0.5, 0.1);
shape.bezierCurveTo(-0.5, -0.2, 0, -0.45, 0, -0.45);
shape.bezierCurveTo(0, -0.45, 0.5, -0.2, 0.5, 0.1);
shape.bezierCurveTo(0.5, 0.65, 0, 0.25, 0, 0.25);
const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 0.08,
  bevelEnabled: true,
});
const heart = new THREE.Mesh(geometry, HeartMaterial);
// patience 0 1 1
// integraty 0 0 1
// Kindness 0 1 0
// Determination 1 0 0
// Justice 1 1 0
// Persistance 1 0 1
// Bravery 1 0.5 0
HeartMaterial.uniforms.Clour_Data.value.set(1, 0, 1);

heart.position.y = 0.5;
heart.scale.setScalar(0.3);
scene.add(heart);

//Timer
const timer = new THREE.Timer();

const tick = () => {
  timer.update();
  const deltaTime = timer.getDelta();
  controls.update();
  world.step(1 / 60, deltaTime, 3);

  HeartMaterial.uniforms.fluidData.value = timer.getElapsed();
  camera.position.set(
    camera_box.position.x,
    camera_box.position.y + cameraEyeHeight,
    camera_box.position.z,
  );
  render.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
