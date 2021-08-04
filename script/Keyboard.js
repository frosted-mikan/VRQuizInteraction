/*
    Keyboard and input box creation 
*/

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { scene, objsToTest, camera } from '/VRQuizInteraction/script/script.js';

var font_json_bold = "/VRQuizInteraction/assets/AvenirNextLTPro-Bold-msdf.json";
var font_png_bold = "/VRQuizInteraction/assets/AvenirNextLTPro-Bold.png";

const colors = {
	keyboardBack: 0x858585,
	panelBack: 0xffffff,
	button: 0x363636,
	hovered: 0xd3d3d3,
	selected: 0x1c1c1c,
    font: 0x000000
};

let userText; // text will appear here

// Create and set up input boxes
function keyboard () {
    const keyboardContain = new THREE.Group();
    keyboardContain.name = "keyboard";
	const container = scene.getObjectByName('quiz');
	container.add(keyboardContain);

	// White input boxes
	const whiteBoxAttributes = {
    	fontFamily: font_json_bold,
		fontTexture: font_png_bold,
    	width: 0.43,
    	height: 0.05,
    	backgroundColor: new THREE.Color(colors.panelBack),
    	backgroundOpacity: 1,
        alignContent: 'center',
		hiddenOverflow: true // inputs have hidden overflow 
	};
    const panel = new ThreeMeshUI.Block(whiteBoxAttributes);
    panel.position.set(0, 0.05, 0.03); 
	panel.name = 'input';

    // User input text 
    userText = new ThreeMeshUI.Text({content: ''});

	// Text will appear here
	const textFieldAttributes = {
    	width: 0.4,
    	height: 0.05,
    	fontSize: 0.04,
		fontFamily: font_json_bold,
		fontTexture: font_png_bold,
    	padding: 0.002,
    	backgroundOpacity: 0,
        fontColor: new THREE.Color(colors.font),
        alignContent: 'left'
	};
    const field = new ThreeMeshUI.Block(textFieldAttributes).add(userText);
	field.position.set(0, 0.14, 0.03);
	panel.add(field);
	keyboardContain.add(panel);

	makeKeyboard();
	
	// Set panel states
	panel.setupState({
		state: "idle",
		attributes: whiteBoxAttributes
	});
	panel.setupState({
		state: "hovered",
		attributes: {
			backgroundColor: new THREE.Color(colors.hovered),
		}
	});
    panel.setupState({
        state: "selected",
        onSet: () => {
			toggle.a = false
        }
    });
}

// Delete the keyboard 
function deleteKeyboard() {
	var obj; 
	const curr = scene.getObjectByName('keysFull');
	for(var i = curr.children.length - 1; i >= 0; i--) { 
		obj = curr.children[i];
		scene.remove(obj); 
   }

   scene.remove(curr);
   camera.remove(curr);
}

// Make the actual keyboard
function makeKeyboard() {
	const keyboard = new ThreeMeshUI.Keyboard({
		fontFamily: font_json_bold,
		fontTexture: font_png_bold,
		fontSize: 0.035, 
		backgroundColor: new THREE.Color(colors.keyboardBack),
	  	backgroundOpacity: 1,
	  	backspaceTexture: '/VRQuizInteraction/assets/backspace.png',
	  	shiftTexture: '/VRQuizInteraction/assets/shift.png',
	  	enterTexture: '/VRQuizInteraction/assets/enter.png'
	});

    keyboard.name = "keysFull";
	scene.add(keyboard);
	camera.add(keyboard); //make keyboard fixed in view
	keyboard.position.set(0, -0.5, -1.12);
	keyboard.rotation.x = -0.55;

	//

	keyboard.keys.forEach((key)=> {
		key.name = "keys";
		objsToTest.push(key);

		key.setupState({
			state: 'idle',
			attributes: {
				offset: 0,
				backgroundColor: new THREE.Color(colors.button),
    			backgroundOpacity: 1
			}
		});

		key.setupState({
			state: 'hovered',
			attributes: {
				offset: 0,
				backgroundColor: new THREE.Color(colors.hovered),
				backgroundOpacity: 1
			}
		});

		key.setupState({
			state: 'selected',
			attributes: {
				offset: -0.009,
				backgroundColor: new THREE.Color(colors.selected),
				backgroundOpacity: 1
			},
			// triggered when the user clicked on a keyboard's key
			onSet: ()=> {
				if (key.info.command) {

					switch(key.info.command) {
						case 'enter' :
							userText.set({content: userText.content += '\n'});
							break;

						case 'space' :
							userText.set({content: userText.content += ' '});
							break;

						case 'backspace' :
							if (!userText.content.length) break
							userText.set({
								content: userText.content.substring(0, userText.content.length - 1) || ""
							});
							break;

						case 'shift' :
							keyboard.toggleCase();
							break;

					};

				// print a glyph, if any
				} else if (key.info.input) {
					userText.set({content: userText.content += key.info.input});
				};
			}
		});

	});
};

export { keyboard, deleteKeyboard, userText };
