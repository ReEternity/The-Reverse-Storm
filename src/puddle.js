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
      
      puddleGroup.add(puddle);
   }
   
   scene.add(puddleGroup);
   puddleGroup.visible = visibility;
   //console.log("Puddles created");
   return puddleGroup;
}

// Returns an updater you can call each frame (delta in seconds) to fade/scale puddles in or out.
export function animatePuddles(
   puddleGroup,
   {
      fadeFrom = 0,
      fadeTo = 0.6,
      scaleFrom = 0.1,
      scaleTo = 1.0,
      duration = 2.0, // seconds
      loop = false
   } = {}
) {
   // Initialize starting state
   puddleGroup.visible = true;
   puddleGroup.children.forEach((mesh) => {
      mesh.material.opacity = fadeFrom;
      mesh.scale.setScalar(scaleFrom);
   });

   let elapsed = 0;

   // Return an updater to be called with the frame's delta time
   return function updatePuddles(deltaSeconds) {
      elapsed += deltaSeconds;
      const t = Math.min(elapsed / duration, 1);

      // Smoothstep easing for a gentle start/stop
      const smooth = t * t * (3 - 2 * t);
      const opacity = fadeFrom + (fadeTo - fadeFrom) * smooth;
      const scale = scaleFrom + (scaleTo - scaleFrom) * smooth;

      puddleGroup.children.forEach((mesh) => {
         mesh.material.opacity = opacity;
         mesh.scale.setScalar(scale);
      });

      // If looping, reset when finished; otherwise signal completion
      if (t >= 1) {
         if (loop) {
            elapsed = 0;
         } else {
            return false; // animation done
         }
      }
      return true; // still animating
   };
}