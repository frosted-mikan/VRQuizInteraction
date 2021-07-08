/*
    Creates and maintains quiz elements
*/

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { scene, objsToTest, dragObjs } from '/script/script.js';

// Load the fonts 
var font_json_bold = "/assets/AvenirNextLTPro-Bold-msdf.json";
var font_png_bold = "/assets/AvenirNextLTPro-Bold.png";
var font_json = "/assets/AvenirNextLTPro-Regular-msdf.json";
var font_png = "/assets/AvenirNextLTPro-Regular.png";

// Begin quiz creation 
function makeQuiz() {
    //Group with all content
    const container = new THREE.Group();
    container.name = "quiz";
    scene.add(container);
    dragObjs.push(container); //not sure if we want it to be draggable
    container.position.set(0, 0.88, -1); 

    //First Question: Cities ------------------------------
    // first Q outer container 
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
    firstQ.visible = false;
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
    buttonRio.setupState(hoveredStateAttributes);
    buttonRio.setupState(idleStateAttributes);

    buttonNYC.setupState(hoveredStateAttributes);
    buttonNYC.setupState(idleStateAttributes);

    buttonLondon.setupState(hoveredStateAttributes);
    buttonLondon.setupState(idleStateAttributes);

    buttonDubai.setupState(hoveredStateAttributes);
    buttonDubai.setupState(idleStateAttributes);
    //add option buttons to firstQ container
    firstQ.add(buttonRio, buttonNYC, buttonLondon, buttonDubai);
    //add option buttons to objsToTest
    objsToTest.push(buttonRio, buttonNYC, buttonLondon, buttonDubai);

    //Second Question: Animals -----------------------
    // second Q outer container 
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
    secondQ.visible = false;
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
    const pandaImg = new THREE.TextureLoader().load('/assets/panda.jpg');
    const bearImg = new THREE.TextureLoader().load('/assets/bear.jpg');
    const fishImg = new THREE.TextureLoader().load('/assets/fish.jpg');
    const penguinImg = new THREE.TextureLoader().load('/assets/penguin.jpg');
    buttonPanda.set({backgroundTexture: pandaImg});
    buttonBear.set({backgroundTexture: bearImg});
    buttonFish.set({backgroundTexture: fishImg});
    buttonPenguin.set({backgroundTexture: penguinImg});
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
    buttonPanda.setupState(hoveredStateAttributes2);
    buttonPanda.setupState(idleStateAttributes2);

    buttonBear.setupState(hoveredStateAttributes2);
    buttonBear.setupState(idleStateAttributes2);

    buttonFish.setupState(hoveredStateAttributes2);
    buttonFish.setupState(idleStateAttributes2);

    buttonPenguin.setupState(hoveredStateAttributes2);
    buttonPenguin.setupState(idleStateAttributes2);
    //add option buttons to secondQ container
    secondQ.add(buttonPanda, buttonBear, buttonFish, buttonPenguin);
    //add option buttons to objsToTest
    objsToTest.push(buttonPanda, buttonBear, buttonFish, buttonPenguin);
    
    //Third Question: Restart---------------------------
    // third Q outer container 
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
    // thirdQ.visible = false;
    container.add(thirdQ);
    thirdQ.name = "thirdQ";
    thirdQ.position.set(0,0,1);
    //create the option buttons 
    const buttonYes = new ThreeMeshUI.Block(buttonOptions);
    const buttonNo = new ThreeMeshUI.Block(buttonOptions);
    //add text to the option buttons 
    buttonYes.add(new ThreeMeshUI.Text({content: 'Yes'}));
    buttonNo.add(new ThreeMeshUI.Text({content: 'No'}));
    //add states to the option buttons 
    buttonYes.setupState(hoveredStateAttributes);
    buttonYes.setupState(idleStateAttributes);

    buttonNo.setupState(hoveredStateAttributes);
    buttonNo.setupState(idleStateAttributes);
    //add option buttons to thirdQ container 
    thirdQ.add(buttonYes, buttonNo);
    //add option buttons to objsToTest
    objsToTest.push(buttonYes, buttonNo);

}

export { makeQuiz };