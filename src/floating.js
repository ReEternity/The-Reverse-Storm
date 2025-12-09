import * as THREE from 'three';

// hold floating objects
const floatingObjects = [];
let startTime = null;

// add an object or group to the floating system
export function addFloating(obj, config = {}) {
    // stops stacking effect if click same object
    if (floatingObjects.find(entry => entry.obj === obj)){
        return;
    }
    // default config
    const settings = {
        amplitude: config.amplitude ?? 0.5,  // how high it floats
        speed: config.speed ?? 1.0,          // float speed
        rotation: config.rotation ?? 0.2,    // rotational wobble
    };
    const targetY = config.targetY ?? (obj.position.y + 20)  // target height to rise to

    const riseSpeed = config.riseSpeed ?? randomInRange(0.00005, 0.0008);

    floatingObjects.push({
        obj,
        basePosition: obj.position.clone(),
        offset: Math.random() * Math.PI * 2, //offset float for each object
        settings,
        targetY,
        riseSpeed
    });
}
//helper function to get random number in range
function randomInRange(min, max) {
    return min + Math.random() * (max - min);
}
// called every frame
export function updateFloating() {
    if (!startTime) startTime = performance.now();
    const t = (performance.now() - startTime) * 0.001;

    for (const item of floatingObjects) {
        const { obj, offset, settings, targetY } = item;

        // FLOAT OFFSET
        const time = t * settings.speed + offset;
        const floatY = Math.sin(time) * settings.amplitude * 0.6
                     + Math.cos(time * 0.7) * settings.amplitude * 0.4;

        
        // ORIENTATION CHECK
        const q = obj.getWorldQuaternion(new THREE.Quaternion());
        const upLocal = new THREE.Vector3(0, 1, 0).applyQuaternion(q);
        const worldUp = new THREE.Vector3(0, 1, 0);
        const dot = upLocal.dot(worldUp);


        

        // APPLY POSITION
        if (Math.abs(dot) < 0.5) {
            item.basePosition.z += (targetY - item.basePosition.z) * item.riseSpeed;

            obj.position.z = item.basePosition.z + floatY;
        } else {
            item.basePosition.y += (targetY - item.basePosition.y) * item.riseSpeed;

            obj.position.y = item.basePosition.y + floatY;
        }

        // WOBBLE ROTATION
        obj.rotation.x = Math.sin(time * 0.5) * settings.rotation * 0.3;
        obj.rotation.z = Math.cos(time * 0.8) * settings.rotation * 0.3;
    }
}


export function floatAllChairs(root) {
    root.traverse(obj => {
        // Detect chairs
        if (obj.isMesh && obj.name.includes("BANQUIT")) {
            setTimeout(() => {// add delay
                addFloating(obj, {
                    amplitude: 5,
                    speed: 0.7 + Math.random() * 1.5,
                    rotation: 0.7,
                    targetY: obj.position.y + 65
                });
            }, Math.random() * 10000);
        }
    });
}