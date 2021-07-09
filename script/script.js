/*
    Set up Three.js scene, listeners, controls
*/

// use /VRQuizInteraction/script/VRButton.js for github pages
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/DragControls.js';
import { VRButton } from '/VRQuizInteraction/script/VRButton.js';
import VRControl from '/VRQuizInteraction/script/VRControl.js';
import { deletePopup, makeContainer, makeFirstQ, makeSecondQ, makeThirdQ, makeEnd } from '/VRQuizInteraction/script/QuizCreation.js';
import { updateButtons } from '/VRQuizInteraction/script/ButtonInteraction.js';


let camera, scene, renderer, vrControl, orbitControls, dragControls;
let objsToTest = []; //for buttons
let dragObjs = []; //for dragging


const mouse = new THREE.Vector2();
mouse.x = mouse.y = null;

let selectState = false; // whether buttons have been selected


// Enter VR mode on fullscreen
const video = document.getElementById('video');
function openFullscreen() {
    video.style.display = 'none';
    enterVR(); 
    init();
    animate();
    makeContainer(); //make outer container
}
document.querySelector('button').addEventListener('click', openFullscreen);

// ---------------------------------------------------------------------------------------

//Animation fade out/in the background video
function fadeOut() {
    var mesh1 = scene.getObjectByName('mesh1');
    mesh1.material.transparent = true;
    mesh1.material.opacity = 1;
    TweenMax.to(mesh1.material, 1, { opacity: 0.7 });
    var mesh2 = scene.getObjectByName('mesh2');
    mesh2.material.transparent = true;
    mesh2.material.opacity = 1;
    TweenMax.to(mesh2.material, 2, { opacity: 0.7 });
}
function fadeIn() {
    var mesh1 = scene.getObjectByName('mesh1');
    var mesh2 = scene.getObjectByName('mesh2');
    mesh1.material.opacity = 1;
    mesh2.material.opacity = 1;
}

// Set listeners on fullscreen
function enterVR() {
    // Event Listener for mouse
    window.addEventListener('pointermove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    });

    // Event Listener for timecode
    var firstCreated, secCreated, thirdCreated, endCreated = false; //for creating each only once on update
    video.addEventListener("timeupdate", function() {
        const container = scene.getObjectByName('quiz');
        if (this.currentTime >= 351) {
            //stop at the end
            this.pause();
        } else if (this.currentTime >= 346) {
            //No, Thanks for playing
            fadeIn();
            this.play();
            if (!endCreated) {
                deletePopup(container.getObjectByName('thirdQ'));
                endCreated = makeEnd();
            }
        } else if (this.currentTime >= 331) {
            //(dubai ends) AnimalQ
            fadeOut(); 
            this.pause(); 
            if (!secCreated) {
                deletePopup(container.getObjectByName('firstQ'));
                secCreated = makeSecondQ();
            }
        } else if (this.currentTime >= 323) {
            //Dubai
            container.getObjectByName('firstQ').visible = false; //hide firstQ
            fadeIn();
            this.play();
        } else if (this.currentTime >= 309) {
            //(penguin ends) RestartQ
            fadeOut(); 
            this.pause(); 
            if (!thirdCreated) {
                deletePopup(container.getObjectByName('secondQ'));
                thirdCreated = makeThirdQ();
            }
        } else if (this.currentTime >= 297) {
            //Penguin
            container.getObjectByName('secondQ').visible = false; //hide secondQ
            fadeIn();
            this.play();
        } else if (this.currentTime >= 284) {
            //(london ends) AnimalQ
            fadeOut(); 
            this.pause(); 
            if (!secCreated) {
                deletePopup(container.getObjectByName('firstQ'));
                secCreated = makeSecondQ();
            }
        } else if (this.currentTime >= 274) {
            //London
            container.getObjectByName('firstQ').visible = false; //hide firstQ
            fadeIn();
            this.play();
        } else if (this.currentTime >= 171) {
            //(bear ends) RestartQ
            fadeOut(); 
            this.pause(); 
            if (!thirdCreated) {
                deletePopup(container.getObjectByName('secondQ'));
                thirdCreated = makeThirdQ();
            }
        } else if (this.currentTime >= 166) {
            //Bear
            container.getObjectByName('secondQ').visible = false; //hide secondQ
            fadeIn();
            this.play();
        } else if (this.currentTime >= 164) {
            //(panda ends) RestartQ
            fadeOut(); 
            this.pause(); 
            if (!thirdCreated) {
                deletePopup(container.getObjectByName('secondQ'));
                thirdCreated = makeThirdQ();
            }
        } else if (this.currentTime >= 160) {
            //Panda
            container.getObjectByName('secondQ').visible = false; //hide secondQ
            fadeIn();
            this.play();
        } else if (this.currentTime >= 130) {
            //(nyc ends) AnimalQ
            fadeOut(); 
            this.pause(); 
            if (!secCreated) {
                deletePopup(container.getObjectByName('firstQ'));
                secCreated = makeSecondQ();
            }
        } else if (this.currentTime >= 105) {
            //NYC
            container.getObjectByName('firstQ').visible = false; //hide firstQ
            fadeIn();
            this.play();
        } else if (this.currentTime >= 104) {
            //(fish ends) RestartQ
            fadeOut(); 
            this.pause(); 
            if (!thirdCreated) {
                deletePopup(container.getObjectByName('secondQ'));
                thirdCreated = makeThirdQ();
            }
        } else if (this.currentTime >= 86) {
            //Fish
            container.getObjectByName('secondQ').visible = false; //hide secondQ
            fadeIn();
            this.play();
        } else if (this.currentTime >= 53) { 
            //(rio ends) AnimalQ
            fadeOut(); 
            this.pause(); 
            if (!secCreated) {
                deletePopup(container.getObjectByName('firstQ'));
                secCreated = makeSecondQ();
            }
        } else if (this.currentTime >= 41) { 
            //Rio
            container.getObjectByName('firstQ').visible = false; //hide firstQ
            fadeIn();
            this.play();
        } else if (this.currentTime >= 10) {
            //CityQ
            fadeOut(); 
            this.pause(); 
            if (!firstCreated) {
                firstCreated = makeFirstQ();
            }
        } else if (this.currentTime >= 0) {
            //Yes, Restart
            if (thirdCreated) {
                deletePopup(container.getObjectByName('thirdQ'));
                firstCreated = secCreated = thirdCreated = endCreated = false;
                this.play();    
            }
        }
    });
          
    // for pressing buttons 
    window.addEventListener('pointerdown', () => {selectState = true;});

    window.addEventListener('pointerup', () => {selectState = false;});

    window.addEventListener('touchstart', (event) => {
        selectState = true;
        mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.touches[0].clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('touchend', () => {
        selectState = false;
        mouse.x = null;
        mouse.y = null;
    });

}

// Init three.js scene
function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
    camera.layers.enable(1); // render left view when no stereo available

    // Video
    video.play();
    const texture = new THREE.VideoTexture(video);

    scene = new THREE.Scene();

    // Left eye
    const geometry1 = new THREE.SphereGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry1.scale(-1, 1, 1);

    const material1 = new THREE.MeshBasicMaterial({map: texture});

    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.name = 'mesh1';
    mesh1.rotation.y = - Math.PI / 2;
    mesh1.layers.set(1); // display in left eye only
    scene.add(mesh1);

    // Right eye
    const geometry2 = new THREE.SphereGeometry(500, 60, 40);
    geometry2.scale(-1, 1, 1);

    const material2 = new THREE.MeshBasicMaterial({map: texture});

    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.name = 'mesh2';
    mesh2.rotation.y = - Math.PI / 2;
    mesh2.layers.set(2); // display in right eye only
    scene.add(mesh2);

    // Set up renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.localClippingEnabled = true; // FOR HIDDENOVERFLOW
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local');

    // Add video to div container
    container.appendChild(renderer.domElement);

    // Orbit controls (for no VR)
    orbitControls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 1.6, 0);
    orbitControls.target = new THREE.Vector3(0, 1, -1.8);

    // Drag controls
    dragControls = new DragControls(dragObjs, camera, renderer.domElement);
    dragControls.transformGroup = true;

    dragControls.addEventListener('dragstart', function () {
        orbitControls.enabled = false;
    });
    dragControls.addEventListener('dragend', function () {
        orbitControls.enabled = true;
    });

    //

    document.body.appendChild(VRButton.createButton(renderer));

    window.addEventListener('resize', onWindowResize);

    // Set up VR controls
    vrControl = VRControl(renderer, camera, scene);
    scene.add(vrControl.controllerGrips[0], vrControl.controllers[0]);
    vrControl.controllers[0].addEventListener('selectstart', onSelectStart);
    vrControl.controllers[0].addEventListener('selectend', onSelectEnd);
    
    scene.add(camera);

}

// For dragging in VR 
function onSelectStart(event) {
    selectState = true;
    const controller = event.target;
    const intersection = raycast();

    if (intersection && intersection.object.visible && controller.userData.selected == undefined) {
        if (intersection.object.name == 'quiz'){
            const object = intersection.object;
            controller.attach(object);
            controller.userData.selected = object;   
        } 
    }
}
function onSelectEnd(event) {
    selectState = false; 
    const controller = event.target;
    if (controller.userData.selected !== undefined) {
        const object = controller.userData.selected;

        if (object.name == 'quiz'){
            scene.attach(object);
        }
        controller.userData.selected = undefined;
    }
}

// Resizing window in no VR
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Render and animate 
function animate() {
    renderer.setAnimationLoop(render);
}
function render() {
    ThreeMeshUI.update();
    orbitControls.update(); // for OrbitControls
    renderer.render(scene, camera);
    updateButtons(); // for buttons 
}

export { camera, scene, objsToTest, dragObjs, renderer, mouse, vrControl, selectState };