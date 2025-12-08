import * as THREE from 'three';

export async function createRain(scene) {
   var rain, rainGeo, rainCount = 15000;

   let positions = [];
   let sizes = [];
   rainGeo = new THREE.BufferGeometry();
   for(let i=0;i<rainCount;i++) {
      rainDrop = new THREE.Vector3(
         Math.random() * 400 -200,
         Math.random() * 500 - 250,
         Math.random() * 400 - 200
      );
      positions.push(Math.random() * 400 -200);
      positions.push(Math.random() * 500 - 250);
      positions.push(Math.random() * 400 - 200);
      sizes.push(30);
   }
   rainGeo.setAttribute(
      "position",
      new Three.BufferAttribute(new Float32Array(position),3)
   );

   rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.2,
      transparent: true
   });
   rain = new THREE.Points(rainGeo,rainMaterial);
   console.log("created the rain");
   console.log(rain);
   scene.add(rain);
   return rain
}