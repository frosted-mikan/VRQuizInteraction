/*
    Create and maintain video controls
*/

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { scene, objsToTest, fadeIn } from '/VRQuizInteraction/script/script.js';
import { deletePopup } from '/VRQuizInteraction/script/QuizCreation.js'; 
import { deleteKeyboard } from '/VRQuizInteraction/script/Keyboard.js';


// Hide visibility of video controls present 
function deleteUI() {
    const curr = scene.getObjectByName('controlsContain');
    curr.visible = false;
    curr.children.forEach(function(object){
        object.visible = false;
    });
}

// Make video controls visible 
function menuUIVisible() {
    const curr = scene.getObjectByName('controlsContain');
    curr.visible = true;
    curr.children.forEach(function(object){
        object.visible = true;
    });
}

// Create Video Controls 
function makeVideoControls() {
    // container for all video controls
    const controlsContain = new ThreeMeshUI.Block({
        height: 0.12,
        width: 0.6, 
        justifyContent:'center',
        contentDirection: 'row-reverse',
        backgroundOpacity: 1,
        margin: 0.03
    });
    controlsContain.position.set(0, -0.5, -1);
    controlsContain.rotation.x = -0.5;
    controlsContain.name = "controlsContain";
    controlsContain.visible = false;
    scene.add(controlsContain);

    // State properties for video controls
    const idleStateControls = {
        state: "idle",
        attributes: {
            backgroundColor: new THREE.Color(0xFFFFFF)
        }
    };
    const hoveredStateAttributes = {
        state: "hovered",
        attributes: {
            backgroundColor: new THREE.Color(0xc2c2c2),
            backgroundOpacity: 1
        },
    };
    const selectedAttributes = {
        offset: 0.02,
        backgroundColor: new THREE.Color(0xc2c2c2),
        backgroundOpacity: 1
    };

    // Play/pause button
    const playpause = new ThreeMeshUI.Block({
        height: 0.07,
        width: 0.07,
        justifyContent: 'start',
        alignContent: 'center',
        padding: 0.02,
        margin: 0.02
    });

    const video = document.getElementById('video');

    const loader = new THREE.TextureLoader();
    loader.load('/VRQuizInteraction/assets/pause.png', (texture) => {
        playpause.set({ backgroundTexture: texture });
    });

    let trigger = true; //video starts playing automatically

    // Event listeners for when video pauses on popups 
    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
        get: function(){
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        }
    })
    video.addEventListener('playing', () => {
        console.log('Video is playing');
        trigger = true;
        loader.load('/VRQuizInteraction/assets/pause.png', (texture) => {
            playpause.set({ backgroundTexture: texture });
        });            
    });
    video.addEventListener('pause', () => {
        console.log('Video is paused');
        trigger = false;
        loader.load('/VRQuizInteraction/assets/play.png', (texture) => {
            playpause.set({ backgroundTexture: texture });
        });            
    });
    //set states for play/pause
    const container = scene.getObjectByName('quiz');
    playpause.setupState({
        state: "selected",
        attributes: selectedAttributes,
        onSet: () => {
            if (trigger){
                console.log('Video is manually paused');
                loader.load('/VRQuizInteraction/assets/play.png', (texture) => {
                    playpause.set({ backgroundTexture: texture });
                });            
                video.pause();
                trigger = false;
            } else {
                console.log('Video is manually played')
                // Delete the popup if it exists 
                if (container.getObjectByName('firstQ')) {
                    deletePopup(container.getObjectByName('firstQ'));
                    fadeIn();
                } else if (container.getObjectByName('secondQ')) {
                    deletePopup(container.getObjectByName('secondQ'));
                    fadeIn();
                } else if (container.getObjectByName('thirdQ')) {
                    deletePopup(container.getObjectByName('thirdQ'));
                    fadeIn();
                } else if (container.getObjectByName('quizQ')) {
                    deletePopup(container.getObjectByName('quizQ'));
                    fadeIn();
                } else if (container.getObjectByName('answer')) {
                    deletePopup(container.getObjectByName('answer'));
                    fadeIn();
                } else if (container.getObjectByName('inputQ')){
                    deletePopup(container.getObjectByName('inputQ'));
                    deletePopup(container.getObjectByName('keyboard'));
                    deleteKeyboard();
                    fadeIn();
                }

                loader.load('/VRQuizInteraction/assets/pause.png', (texture) => {
                    playpause.set({ backgroundTexture: texture });
                });            
                video.play();
                trigger = true;
            }
        }
    });
    playpause.setupState(hoveredStateAttributes);
    playpause.setupState(idleStateControls);

    // Fastfoward button
    const fastForward = new ThreeMeshUI.Block({
        height: 0.07,
        width: 0.07,
        justifyContent: 'start',
        alignContent: 'center',
        padding: 0.02
    });
    loader.load('/VRQuizInteraction/assets/fastforward.png', (texture) => {
        fastForward.set({ backgroundTexture: texture });
    });
    //set states for fastforward
    fastForward.setupState({
        state: "selected", 
        attributes: selectedAttributes,
        onSet: () => { 
            // Delete the popup if it exists 
            if (container.getObjectByName('firstQ')) {
                deletePopup(container.getObjectByName('firstQ'));
                fadeIn();
            } else if (container.getObjectByName('secondQ')) {
                deletePopup(container.getObjectByName('secondQ'));
                fadeIn();
            } else if (container.getObjectByName('thirdQ')) {
                deletePopup(container.getObjectByName('thirdQ'));
                fadeIn();
            } else if (container.getObjectByName('quizQ')) {
                deletePopup(container.getObjectByName('quizQ'));
                fadeIn();
            } else if (container.getObjectByName('answer')) {
                deletePopup(container.getObjectByName('answer'));
                fadeIn();
            } else if (container.getObjectByName('inputQ')){
                deletePopup(container.getObjectByName('inputQ'));
                deletePopup(container.getObjectByName('keyboard'));
                deleteKeyboard();
                fadeIn();
            }
            
            video.currentTime = video.duration; 
        }
    });
    fastForward.setupState(hoveredStateAttributes);
    fastForward.setupState(idleStateControls);

    // Rewind button
    const rewind = new ThreeMeshUI.Block({
        height: 0.07,
        width: 0.07,
        justifyContent: 'start',
        alignContent: 'center',
        padding: 0.02
    });
    loader.load('/VRQuizInteraction/assets/rewind.png', (texture) => {
        rewind.set({ backgroundTexture: texture });
    });
    //set states for rewind
    rewind.setupState({
        state: "selected",
        attributes: selectedAttributes,
        onSet: () => {
            // Delete the popup if it exists 
            if (container.getObjectByName('firstQ')) {
                deletePopup(container.getObjectByName('firstQ'));
                fadeIn();
            } else if (container.getObjectByName('secondQ')) {
                deletePopup(container.getObjectByName('secondQ'));
                fadeIn();
            } else if (container.getObjectByName('thirdQ')) {
                deletePopup(container.getObjectByName('thirdQ'));
                fadeIn();
            } else if (container.getObjectByName('quizQ')) {
                deletePopup(container.getObjectByName('quizQ'));
                fadeIn();
            } else if (container.getObjectByName('answer')) {
                deletePopup(container.getObjectByName('answer'));
                fadeIn();
            } else if (container.getObjectByName('inputQ')){
                deletePopup(container.getObjectByName('inputQ'));
                deletePopup(container.getObjectByName('keyboard'));
                deleteKeyboard();
                fadeIn();
            }
            video.currentTime = 0;
        }
    });
    rewind.setupState(hoveredStateAttributes);
    rewind.setupState(idleStateControls);
    
    // To create margins around the control buttons 
    const filler1 = new ThreeMeshUI.Block({
        height: 0.1,
        width: 0.08, 
        backgroundOpacity: 0
    });
    const filler2 = new ThreeMeshUI.Block({
        height: 0.1,
        width: 0.08,
        backgroundOpacity: 0
    });

    // Add all video controls to container 
    fastForward.name = playpause.name = rewind.name = 'vidcontrols';
    controlsContain.add(fastForward, filler1, playpause, filler2, rewind);
    objsToTest.push(fastForward, playpause, rewind);

}

export { deleteUI, menuUIVisible, makeVideoControls };
