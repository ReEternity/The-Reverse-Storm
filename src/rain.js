import * as THREE from 'three';

export async function createRain(scene, colorS, sizeS, amountS, visibility) {
   var rain, rainGeo, rainMaterial;
   //15000 final, radius expand outward
   let positions = [];
   let sizes = [];
   rainGeo = new THREE.BufferGeometry();
   for(let i=0;i<amountS;i++) {
      positions.push(Math.random() * 400 - 200);
      positions.push(Math.random() * 500 - 250);
      positions.push(Math.random() * 400 - 200);
      sizes.push(30);
   }
   rainGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions),3)
   );

   rainMaterial = new THREE.PointsMaterial({
      color: colorS,//0xaaaaaa for white, 0x000000 for black
      size: sizeS,
      transparent: true
   });
   rain = new THREE.Points(rainGeo,rainMaterial);
   //rain.material.fog = false;
   //console.log("rain" + rain);
   scene.add(rain);
   rain.visible = visibility;
   return rain
}