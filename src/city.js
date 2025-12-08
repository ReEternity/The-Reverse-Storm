import * as THREE from 'three';
import { loadGLB } from './loader.js';

export async function createCity(scene) {

    var building = await loadGLB('../urban_enviroment.glb');
    building.scale.set(100, 100, 100);
    building.position.set(0, 0, 0);

    scene.add(building);
    // highlight red box outline
    //var helper = new THREE.BoxHelper(building, 0xff0000);
    //helper.material.depthWrite = false;
    //scene.add(helper);
    console.log("Building loaded:", building);

    return building;
}