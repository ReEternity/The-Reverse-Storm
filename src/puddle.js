import * as THREE from 'three';

export async function createPuddle(scene, colorS, sizeS, amountS, visibility) {
   let puddleGroup = new THREE.Group();
   
   for(let i = 0; i < amountS; i++) {
      // Create flat cylinder geometry for each puddle
      const radius = sizeS * (0.5 + Math.random() * 0.5); // Vary puddle size
      const height = 0.1; // Very flat
      const puddleGeo = new THREE.CylinderGeometry(radius, radius, height, 16);
      
      const puddleMaterial = new THREE.MeshBasicMaterial({
         color: colorS,
         transparent: true,
         opacity: 0.6,
         side: THREE.DoubleSide
      });
      
      const puddle = new THREE.Mesh(puddleGeo, puddleMaterial);
      
      // Position puddle on the ground (y = 0 or slightly above)
      puddle.position.set(
         Math.random() * 400 - 200,
         0.05,
         Math.random() * 400 - 200
      );
      
      // Rotate to lay flat on ground
      puddle.rotation.x = Math.PI / 2;
      
      puddleGroup.add(puddle);
   }
   
   scene.add(puddleGroup);
   puddleGroup.visible = visibility;
   return puddleGroup;
}