/*
    Creates and maintains quiz elements
*/

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { scene, objsToTest, dragObjs } from '/360videodemo/script/script.js';

// Load the fonts 
var font_json_bold = "/360videodemo/assets/AvenirNextLTPro-Bold-msdf.json";
var font_png_bold = "/360videodemo/assets/AvenirNextLTPro-Bold.png";
var font_json = "/360videodemo/assets/AvenirNextLTPro-Regular-msdf.json";
var font_png = "/360videodemo/assets/AvenirNextLTPro-Regular.png";


const video = document.getElementById('video');

// Make the outer container
function makeContainer() {
    //Group with all content
    const container = new THREE.Group();
    container.name = "quiz";
    container.position.set(0, 1, -1); 
    scene.add(container);
    dragObjs.push(container); //not sure if we want it to be draggable?
}


// Delete a popup 
function deletePopup(popup) {
    objsToTest.splice(0, objsToTest.length); //clear objsToTest
	var obj; 
	const container = scene.getObjectByName('quiz');
	for(var i = popup.children.length - 1; i >= 0; i--) { 
		obj = popup.children[i];
		popup.remove(obj); 
   }

   container.remove(popup);
}

// Make first question (cities)
function makeFirstQ() {
    //First Question: Cities ------------------------------
    // first Q outer container 
    const container = scene.getObjectByName('quiz');
    const firstQ = new ThreeMeshUI.Block({
        height: 0.8,
        width: 0.8,
        backgroundOpacity: 1,
        justifyContent: 'center',
        fontFamily: font_json_bold,
        fontTexture: font_png_bold,
        fontSize: 0.04
    });
    const cityQ = new ThreeMeshUI.Block({
        height: 0.1,
        width: 0.8, 
        justifyContent: 'center',
        backgroundOpacity: 0
    })
    cityQ.add(
        new ThreeMeshUI.Text({
            content: 'Which city would you like to visit?'
        })
    );
    firstQ.add(cityQ);
    container.add(firstQ);
    firstQ.name = "firstQ";
    // first Q button options and configuration 
    const buttonOptions = {
        width: 0.6,
        height: 0.1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 0.04,
        fontSize: 0.03,
        backgroundOpacity: 1
    };
    //create the option buttons 
    const buttonRio = new ThreeMeshUI.Block(buttonOptions);
    const buttonNYC = new ThreeMeshUI.Block(buttonOptions);
    const buttonLondon = new ThreeMeshUI.Block(buttonOptions);
    const buttonDubai = new ThreeMeshUI.Block(buttonOptions);
    //add text to the option buttons 
    buttonRio.add(new ThreeMeshUI.Text({content:'Rio de Janeiro'}));
    buttonNYC.add(new ThreeMeshUI.Text({content:'New York City'}));
    buttonLondon.add(new ThreeMeshUI.Text({content:'London'}));
    buttonDubai.add(new ThreeMeshUI.Text({content:'Dubai'}));
    //add states to the option buttons
    const hoveredStateAttributes = {
        state: "hovered",
        attributes: {
            backgroundColor: new THREE.Color(0xd24f39),
            backgroundOpacity: 1
        },
    };
    const idleStateAttributes = {
        state: "idle",
        attributes: {
            backgroundOpacity: 1, 
            backgroundColor: new THREE.Color(0x000000)
        },
    };
    const selectedAttributes = {
        backgroundColor: new THREE.Color(0xd24f39),
        backgroundOpacity: 1
    };

    buttonRio.setupState(hoveredStateAttributes);
    buttonRio.setupState(idleStateAttributes);
    buttonRio.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 41.5; //go to Rio
        }
    });

    buttonNYC.setupState(hoveredStateAttributes);
    buttonNYC.setupState(idleStateAttributes);
    buttonNYC.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 105.5; 
        }
    });

    buttonLondon.setupState(hoveredStateAttributes);
    buttonLondon.setupState(idleStateAttributes);
    buttonLondon.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 274; 
        }
    });

    buttonDubai.setupState(hoveredStateAttributes);
    buttonDubai.setupState(idleStateAttributes);
    buttonDubai.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 323; 
        }
    });

    //add option buttons to firstQ container
    firstQ.add(buttonRio, buttonNYC, buttonLondon, buttonDubai);
    //add option buttons to objsToTest
    objsToTest.push(buttonRio, buttonNYC, buttonLondon, buttonDubai);

    return true; //for creating only once
}

// Make second question (animals)
function makeSecondQ() {
    //Second Question: Animals -----------------------
    // second Q outer container 
    const container = scene.getObjectByName('quiz');
    const secondQ = new ThreeMeshUI.Block({
        height: 1,
        width: 0.8,
        backgroundOpacity: 1,
        justifyContent: 'center',
        fontFamily: font_json_bold,
        fontTexture: font_png_bold,
        fontSize: 0.04
    });
    const animalQ = new ThreeMeshUI.Block({
        height: 0.1,
        width: 0.8, 
        justifyContent: 'center',
        backgroundOpacity: 0
    })
    animalQ.add(
        new ThreeMeshUI.Text({
            content: 'What animal would you like to see?'
        })
    );
    secondQ.add(animalQ);
    container.add(secondQ);
    secondQ.name = "secondQ";

    //create the option buttons 
    const buttonOptions2 = {
        width: 0.6,
        height: 0.2,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 0.04,
        fontSize: 0.03,
        backgroundOpacity: 1
    };
    const buttonPanda = new ThreeMeshUI.Block(buttonOptions2);
    const buttonBear = new ThreeMeshUI.Block(buttonOptions2);
    const buttonFish = new ThreeMeshUI.Block(buttonOptions2);
    const buttonPenguin = new ThreeMeshUI.Block(buttonOptions2);
    //add images to the option buttons 

    const loader = new THREE.TextureLoader();

    loader.load('/360videodemo/assets/panda.jpg', (texture) => {
        buttonPanda.set({ backgroundTexture: texture });
    });
    loader.load('/360videodemo/assets/bear.jpg', (texture) => {
        buttonBear.set({backgroundTexture: texture});
    });
    loader.load('/360videodemo/assets/fish.jpg', (texture) => {
        buttonFish.set({backgroundTexture: texture});
    });
    loader.load('/360videodemo/assets/penguin.jpg', (texture) => {
        buttonPenguin.set({backgroundTexture: texture});
    });

    //add states to the option buttons
    const hoveredStateAttributes2 = {
        state: "hovered",
        attributes: {
            backgroundOpacity: 0.5
        },
    };
    const idleStateAttributes2 = {
        state: "idle",
        attributes: {
            backgroundOpacity: 1
        },
    };
    const selectedAttributes = {
        backgroundOpacity: 0.5
    };

    buttonPanda.setupState(hoveredStateAttributes2);
    buttonPanda.setupState(idleStateAttributes2);
    buttonPanda.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 160; 
        }
    });

    buttonBear.setupState(hoveredStateAttributes2);
    buttonBear.setupState(idleStateAttributes2);
    buttonBear.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 166; 
        }
    });

    buttonFish.setupState(hoveredStateAttributes2);
    buttonFish.setupState(idleStateAttributes2);
    buttonFish.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 86; 
        }
    });

    buttonPenguin.setupState(hoveredStateAttributes2);
    buttonPenguin.setupState(idleStateAttributes2);
    buttonPenguin.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 297; 
        }
    });

    //add option buttons to secondQ container
    secondQ.add(buttonPanda, buttonBear, buttonFish, buttonPenguin);
    //add option buttons to objsToTest
    objsToTest.push(buttonPanda, buttonBear, buttonFish, buttonPenguin);

    return true; //for creating only once

}

// Make third question (restart)
function makeThirdQ() {
    //Third Question: Restart---------------------------
    // third Q outer container 
    const container = scene.getObjectByName('quiz');
    const thirdQ = new ThreeMeshUI.Block({
        height: 0.5,
        width: 0.8,
        backgroundOpacity: 1,
        justifyContent: 'center',
        fontFamily: font_json_bold,
        fontTexture: font_png_bold,
        fontSize: 0.04
    });
    const restartQ = new ThreeMeshUI.Block({
        height: 0.1,
        width: 0.8, 
        justifyContent: 'center',
        backgroundOpacity: 0
    })
    restartQ.add(
        new ThreeMeshUI.Text({
            content: 'Would you like to start over?'
        })
    );
    thirdQ.add(restartQ);
    container.add(thirdQ);
    thirdQ.name = "thirdQ";
    //create the option buttons 
    const buttonOptions = {
        width: 0.6,
        height: 0.1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 0.04,
        fontSize: 0.03,
        backgroundOpacity: 1
    };
    const buttonYes = new ThreeMeshUI.Block(buttonOptions);
    const buttonNo = new ThreeMeshUI.Block(buttonOptions);
    //add text to the option buttons 
    buttonYes.add(new ThreeMeshUI.Text({content: 'Yes'}));
    buttonNo.add(new ThreeMeshUI.Text({content: 'No'}));
    //add states to the option buttons 
    const hoveredStateAttributes = {
        state: "hovered",
        attributes: {
            backgroundColor: new THREE.Color(0xd24f39),
            backgroundOpacity: 1
        },
    };
    const idleStateAttributes = {
        state: "idle",
        attributes: {
            backgroundOpacity: 1, 
            backgroundColor: new THREE.Color(0x000000)
        },
    };
    const selectedAttributes = {
        backgroundColor: new THREE.Color(0xd24f39),
        backgroundOpacity: 1
    };

    buttonYes.setupState(hoveredStateAttributes);
    buttonYes.setupState(idleStateAttributes);
    buttonYes.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 0; 
        }
    });

    buttonNo.setupState(hoveredStateAttributes);
    buttonNo.setupState(idleStateAttributes);
    buttonNo.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            video.currentTime = 346; 
        }
    });

    //add option buttons to thirdQ container 
    thirdQ.add(buttonYes, buttonNo);
    //add option buttons to objsToTest
    objsToTest.push(buttonYes, buttonNo);

    return true; //for creating only once

}

// Make 'Thanks for playing' popup
function makeEnd() {
    //End Popup ---------------------------
    // endPop outer container 
    const container = scene.getObjectByName('quiz');
    const endPop = new ThreeMeshUI.Block({
        height: 0.3,
        width: 0.8,
        backgroundOpacity: 1,
        justifyContent: 'center',
        fontFamily: font_json_bold,
        fontTexture: font_png_bold,
        fontSize: 0.06
    });
    const thank = new ThreeMeshUI.Block({
        height: 0.3,
        width: 0.8, 
        justifyContent: 'center',
        backgroundOpacity: 0
    })
    thank.add(
        new ThreeMeshUI.Text({
            content: 'Thanks for playing!'
        })
    );
    endPop.add(thank);
    container.add(endPop);

    return true; //for creating only once
}

export { deletePopup, makeContainer, makeFirstQ, makeSecondQ, makeThirdQ, makeEnd };