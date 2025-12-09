
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

    floatingObjects.push({
        obj,
        basePosition: obj.position.clone(),
        offset: Math.random() * Math.PI * 2, //offset float for each object
        settings
    });
}

// called every frame
export function updateFloating() {
    if (!startTime) {
        startTime = performance.now();
    }
    const t = (performance.now() - startTime) * 0.001;  // convert ms → seconds

    for (const item of floatingObjects) {
        const { obj, basePosition, offset, settings } = item;

        const time = t * settings.speed + offset;

        // movement using sin + cos
        const floatY = Math.sin(time) * settings.amplitude * 0.6
                     + Math.cos(time * 0.7) * settings.amplitude * 0.4;

        obj.position.y = basePosition.y + floatY;

        // gives it a wobble effect
        obj.rotation.x = Math.sin(time * 0.5) * settings.rotation * 0.3;
        obj.rotation.z = Math.cos(time * 0.8) * settings.rotation * 0.3;
        //obj.rotation.y += 0.002; // slow spin (optional)
    }
}


export function floatAllChairs(root) {
    root.traverse(obj => {
        // Detect chairs
        if (obj.isMesh && obj.name.includes("BANQUIT")) {
            addFloating(obj, {
                amplitude: 20,
                speed: 0.7,
                rotation: 0.3
            });
        }
    });
}