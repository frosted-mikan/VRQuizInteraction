/*
    Functions for button interaction 
*/

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { camera, objsToTest, renderer, mouse, vrControl, selectState } from '/VRQuizInteraction/script/script.js';


let curr; // keep track of current object selected
const raycaster = new THREE.Raycaster();


function updateButtons() {
    let intersect;

    if (renderer.xr.isPresenting) { // Entered VR
        vrControl.setFromController(0, raycaster.ray);
        intersect = raycast();

        if (intersect) {
            vrControl.setPointerAt(0, intersect.point);
        }

    } else if (mouse.x !== null && mouse.y !== null) { // Not entered VR
        raycaster.setFromCamera(mouse, camera);
        intersect = raycast();
    }

    if (intersect && intersect.object.isUI && intersect.object.visible) {
        if (selectState) {
            intersect.object.setState('selected');
            curr = intersect.object;
        } else {
            intersect.object.setState('hovered');
            curr = intersect.object;
        }
    } 

    objsToTest.forEach((obj) => {
        if ((!intersect || obj !== intersect.object) && obj.isUI && obj != curr) {
            obj.setState('idle');
        }
    });
}

function raycast() {
    return objsToTest.reduce((closestIntersection, obj) => {
        const intersection = raycaster.intersectObject(obj, true);
        if (!intersection[0]) return closestIntersection;
        if (!closestIntersection || intersection[0].distance < closestIntersection.distance) {
            intersection[0].object = obj;
            return intersection[0];
        } else {
            return closestIntersection;
        }
    }, null);
}

export { updateButtons, raycast };