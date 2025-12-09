import * as THREE from 'three';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
export async function createRain2(scene, colorS, sizeS, amountS, visibility) {
   let rainGroup = new THREE.Group();
   
   for(let i = 0; i < amountS; i++) {
      const x = Math.random() * 400 - 200;
      const y = Math.random() * 500 - 250;
      const z = Math.random() * 400 - 200;
      
      const geometry = new LineSegmentsGeometry();
      geometry.setPositions([
         x, y, z,
         x, y - 5, z
      ]);
      
      const material = new LineMaterial({
         color: colorS,
         linewidth: sizeS,
         worldUnits: true,
         alphaToCoverage: true
      });
      
      const line = new LineSegments2(geometry, material);
      rainGroup.add(line);
   }
   scene.add(rainGroup);
   rainGroup.visible = visibility;
   return rainGroup;
}