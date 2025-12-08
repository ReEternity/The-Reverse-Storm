import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadGLB(url) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            url,
            (gltf) => resolve(gltf.scene),     // return the model's scene
            undefined,
            (err) => reject(err)
        );
    });

    
}