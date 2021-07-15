/*
    Creates and maintains quiz elements
*/

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { deleteKeyboard, keyboard, userText } from '/VRQuizInteraction/script/Keyboard.js';
import { scene, objsToTest, dragObjs, fadeIn } from '/VRQuizInteraction/script/script.js';

// Load the fonts 
var font_json_bold = "/VRQuizInteraction/assets/AvenirNextLTPro-Bold-msdf.json";
var font_png_bold = "/VRQuizInteraction/assets/AvenirNextLTPro-Bold.png";


const video = document.getElementById('video');

// Make the outer container
function makeContainer() {
    //Group with all content
    const container = new THREE.Group();
    container.name = "quiz";
    container.position.set(0, 1, -1); 
    scene.add(container);
    dragObjs.push(container); //for DragControls

}

// Delete a popup 
function deletePopup(popup) {
    objsToTest.splice(3, objsToTest.length-3); //clear objsToTest
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
        backgroundOpacity: 1,
        margin: 0.01
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

// Make popup with quiz results
function makeAnswer(question, answer, count) {    
    const container = scene.getObjectByName('quiz');    
    //Delete the quiz q first 
    if (question == "quizQ") {
        deletePopup(container.getObjectByName('quizQ'));
    }
    else if (question == "inputQ") {
        deletePopup(container.getObjectByName('inputQ'));
        deletePopup(container.getObjectByName('keyboard'));
        deleteKeyboard();
    }

    const popup = new ThreeMeshUI.Block({
        height: 0.4,
        width: 0.8,
        backgroundOpacity: 1,
        justifyContent: 'center',
        fontFamily: font_json_bold,
        fontTexture: font_png_bold,
        fontSize: 0.04
    });
    const textbox = new ThreeMeshUI.Block({
        height: 0.1,
        width: 0.8, 
        justifyContent: 'center',
        backgroundOpacity: 0
    })
    if (!answer) {
        textbox.add(
            new ThreeMeshUI.Text({
                content: 'Incorrect'
            })
        );    
    } else {
        textbox.add(
            new ThreeMeshUI.Text({
                content: 'Correct!'
            })
        );    
    }
    popup.add(textbox);
    container.add(popup);
    popup.name = "answer";
    
    const buttonOptions = {
        width: 0.6,
        height: 0.1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 0.04,
        fontSize: 0.03,
        backgroundOpacity: 1,
        margin: 0.01
    };
    //create the option buttons 
    const back = new ThreeMeshUI.Block(buttonOptions);
    const forward = new ThreeMeshUI.Block(buttonOptions);
    //add text to the option buttons 
    back.add(new ThreeMeshUI.Text({content:'Go Back'}));
    forward.add(new ThreeMeshUI.Text({content:'Continue'}));
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

    var counter = 0;

    back.setupState(hoveredStateAttributes);
    back.setupState(idleStateAttributes);
    back.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            counter += 1;
            if (counter >= 2) {
                console.log('go back');
                if (question == 'quizQ') video.currentTime = 41.5; //go back to Rio 
                else video.currentTime = 160;
                deletePopup(container.getObjectByName('answer'));   
            }
        }
    });

    forward.setupState(hoveredStateAttributes);
    forward.setupState(idleStateAttributes);
    forward.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            //continue to end of video
            console.log(counter);
            counter += 1;
            if (counter >= count) {
                console.log('go forward');
                fadeIn();
                video.play();    
                deletePopup(container.getObjectByName('answer'));
            }
        }
    });

    //add option buttons to container
    if (!answer) popup.add(back, forward);
    else popup.add(forward);
    //add option buttons to objsToTest
    if (!answer) objsToTest.push(back, forward);
    else objsToTest.push(forward);

}

// Make Quiz Question 
function makeQuizQ() {
    //Quiz Question: Things in Rio ------------------------------
    // quiz Q outer container 
    const container = scene.getObjectByName('quiz');
    const quizQ = new ThreeMeshUI.Block({
        height: 0.8,
        width: 0.8,
        backgroundOpacity: 1,
        justifyContent: 'center',
        fontFamily: font_json_bold,
        fontTexture: font_png_bold,
        fontSize: 0.04
    });
    const rioQ = new ThreeMeshUI.Block({
        height: 0.1,
        width: 0.8, 
        justifyContent: 'center',
        backgroundOpacity: 0
    })
    rioQ.add(
        new ThreeMeshUI.Text({
            content: 'What famous landmark is in Rio?'
        })
    );
    quizQ.add(rioQ);
    container.add(quizQ);
    quizQ.name = "quizQ";
    // quiz Q button options and configuration 
    const buttonOptions = {
        width: 0.6,
        height: 0.1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 0.04,
        fontSize: 0.03,
        backgroundOpacity: 1,
        margin: 0.01
    };
    //create the option buttons 
    const wrong1 = new ThreeMeshUI.Block(buttonOptions);
    const correct = new ThreeMeshUI.Block(buttonOptions);
    const wrong2 = new ThreeMeshUI.Block(buttonOptions);
    const wrong3 = new ThreeMeshUI.Block(buttonOptions);
    //add text to the option buttons 
    wrong1.add(new ThreeMeshUI.Text({content:'Empire State Building'}));
    correct.add(new ThreeMeshUI.Text({content:'Christ the Redeemer statue'}));
    wrong2.add(new ThreeMeshUI.Text({content:'Big Ben'}));
    wrong3.add(new ThreeMeshUI.Text({content:'Burj Khalifa'}));
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

    wrong1.setupState(hoveredStateAttributes);
    wrong1.setupState(idleStateAttributes);
    wrong1.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            //display 'incorrect' popup
            makeAnswer('quizQ', false, 2);
        }
    });

    correct.setupState(hoveredStateAttributes);
    correct.setupState(idleStateAttributes);
    correct.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            //display 'correct' popup
            makeAnswer('quizQ', true, 2);
        }
    });

    wrong2.setupState(hoveredStateAttributes);
    wrong2.setupState(idleStateAttributes);
    wrong2.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            //display 'incorrect' popup
            makeAnswer('quizQ', false, 3);
        }
    });

    wrong3.setupState(hoveredStateAttributes);
    wrong3.setupState(idleStateAttributes);
    wrong3.setupState({
        state: "selected",
        attributes:selectedAttributes,
        onSet: () => {
            //display 'incorrect' popup
            makeAnswer('quizQ', false, 2);
        }
    });

    //add option buttons to quizQ container
    quizQ.add(wrong1, correct, wrong2, wrong3);
    //add option buttons to objsToTest
    objsToTest.push(wrong1, correct, wrong2, wrong3);

    return true; //for creating only once

}

// Make second question (animals)
function makeSecondQ() {
    //Second Question: Animals -----------------------
    // second Q outer container 
    const container = scene.getObjectByName('quiz');
    const secondQ = new ThreeMeshUI.Block({
        height: 1.1,
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
        backgroundOpacity: 1,
        margin: 0.01
    };
    const buttonPanda = new ThreeMeshUI.Block(buttonOptions2);
    const buttonBear = new ThreeMeshUI.Block(buttonOptions2);
    const buttonFish = new ThreeMeshUI.Block(buttonOptions2);
    const buttonPenguin = new ThreeMeshUI.Block(buttonOptions2);

    //add videos/gifs to the option buttons 
    const pandavid = document.getElementById('panda');
    pandavid.play();
    const pandatex = new THREE.VideoTexture(pandavid);
    buttonPanda.set({ backgroundTexture: pandatex });

    const bearvid = document.getElementById('bear');
    bearvid.play();
    const beartex = new THREE.VideoTexture(bearvid);
    buttonBear.set({ backgroundTexture: beartex });

    const fishvid = document.getElementById('fish');
    fishvid.play();
    const fishtex = new THREE.VideoTexture(fishvid);
    buttonFish.set({ backgroundTexture: fishtex });

    const penguinvid = document.getElementById('penguin');
    penguinvid.play();
    const penguintex = new THREE.VideoTexture(penguinvid);
    buttonPenguin.set({ backgroundTexture: penguintex });

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
        backgroundOpacity: 1,
        margin: 0.01
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
    endPop.name = "thank";
    container.add(endPop);

    return true; //for creating only once
}

// Make fixed-in-space popups 
function makeFixed() {
    const hudsonRiver = new ThreeMeshUI.Block({
        height: 0.3,
        width: 0.8,
        backgroundOpacity: 1,
        justifyContent: 'center',
        fontFamily: font_json_bold,
        fontTexture: font_png_bold,
        fontSize: 0.1
    });

    hudsonRiver.position.set(-2, 1.5, -5);

    //Make triangle
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array( [
        -2.2, 1.4, -5,
        -1.9, 1.4, -5,
        -1.8, 0.9, -5
    ] );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material = new THREE.MeshBasicMaterial( { color: 0x222222, side: THREE.DoubleSide } );
    const triangle = new THREE.Mesh( geometry, material );
    scene.add(triangle);
    triangle.name = 'triangle';

    //Add text
    const hudson = new ThreeMeshUI.Block({
        height: 0.3,
        width: 0.8, 
        justifyContent: 'center',
        backgroundOpacity: 0
    })
    hudson.add(
        new ThreeMeshUI.Text({
            content: 'Hudson River'
        })
    );
    hudsonRiver.add(hudson);
    hudsonRiver.name = "hudson";
    scene.add(hudsonRiver);

    return true; //for creating only once
}

// Make question with user input 
function makeInput() {
    const container = scene.getObjectByName('quiz');
    const inputQ = new ThreeMeshUI.Block({
        height: 0.5,
        width: 0.8,
        backgroundOpacity: 1,
        justifyContent: 'center',
        fontFamily: font_json_bold,
        fontTexture: font_png_bold,
        fontSize: 0.04
    });
    const pandaQ = new ThreeMeshUI.Block({
        height: 0.1,
        width: 0.8, 
        justifyContent: 'center',
        backgroundOpacity: 0
    })
    const text = new ThreeMeshUI.Text({
        content: 'Where do pandas live?'
    })
    pandaQ.add(text);
    text.position.set(0, 0.02, 0);

    const submit = new ThreeMeshUI.Block({
        height: 0.06,
        width: 0.2,
        backgroundOpacity: 1,
        backgroundColor: new THREE.Color(0xFF0000),
        margin: 0.07,
        justifyContent: 'center'
    })
    submit.position.set(0, -1, 0.03);
    submit.setupState({
        state: 'selected',
        onSet: ()=> {
            var content = userText.content;
            if (content == "chengdu") { 
                makeAnswer('inputQ', true, 2);
            } else {
                makeAnswer('inputQ', false, 2);
            }
        }
    });
    submit.add(
        new ThreeMeshUI.Text({
            content: 'Submit'
        })
    );
    inputQ.add(pandaQ, submit);
    objsToTest.push(submit);
    container.add(inputQ);
    inputQ.name = "inputQ";
    keyboard();

    return true;
}

export { deletePopup, makeContainer, makeFirstQ, makeQuizQ, makeSecondQ, makeThirdQ, makeEnd, makeFixed, makeInput };