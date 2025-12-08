import * as THREE from 'three';

export async function createRain(scene) {
   var rain, rainGeo, rainMaterial, rainCount = 150;

   let positions = [];
   let sizes = [];
   rainGeo = new THREE.BufferGeometry();
   for(let i=0;i<rainCount;i++) {
      positions.push(Math.random() * 400 -200);
      positions.push(Math.random() * 500 - 250);
      positions.push(Math.random() * 400 - 200);
      sizes.push(30);
   }
   rainGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions),3)
   );

   rainMaterial = new THREE.PointsMaterial({
      color: 0x000000,//0xaaaaaa for white, 0x000000 for black
      size: 0.5,
      transparent: true
   });
   rain = new THREE.Points(rainGeo,rainMaterial);
   console.log("created the rain");
   console.log(rain);
   scene.add(rain);
   return rain
}