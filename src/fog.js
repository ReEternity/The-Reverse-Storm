import * as THREE from 'three';

export async function createFog(scene, cloudParticles) {
   var cloud, cloudGeo, cloudMaterial;
   let loader = new THREE.TextureLoader();
   loader.load("src/fog.png", function(texture){
   cloudGeo = new THREE.PlaneGeometry(100,100);
   cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
   });
   for(let p=0; p<25; p++) {
      let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
      cloud.position.set(
      0,
      10,
      0
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random()*360;
      cloud.material.opacity = 0.6;
      cloudParticles.push(cloud);
      scene.add(cloud);
   }});
   return cloud
}