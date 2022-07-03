let EDITMODE = true;
let QUADCANVAS = false;
let disableDrawInterface = false;
let cargoArchivo = true;
let WEBGL_ON = false; //Algunas funcionan con esto otras no. //Si cambia esto cambia e
var dropzone;
document.addEventListener("keypress", documentOnKeyPressed, false);
var RM;
var img;
var interface;
var font;
let shtest;
let pgtest;
var p5jsdraw; 
//play a middle 'C' for the duration of an 8th note

let click_duration = 5000;
let click_lasttime = 0;
let first_click = false;
let gmixer;

//DesolatedLandManager
//ooxNM5jwVNtV7F2viGJ3Su9Temt5dhvtuhL3uma2fpgRAF5xAuz

let musicplaying = false;



//let musicscale;
//let synth;
let synth2;
let synth3;

//let loop;
let loop2;
let loop3;

//let scale;
let prevNote;

let init = false;
//setFxhash_cirline();
//setFxhash_luzYSombra();


//ESTO ES PARA QUE LEVANTE LOS FEATURES EN FXHASH 
window.onload = function() {
	setFxhash_luzYSombra();
	preload();
	init = true;

	console.table(window.$fxhashFeatures);
  };
function preload() {
	if(init){return};
	setFxhash_luzYSombra();
    RM = new RenderManager();

	p5jsdraw1 = new luzysombram();
	RM.addP5draw(p5jsdraw1, 0);


}

function setup() {
	

	noiseSeed(genR(1, 100));

	createCanvas(windowWidth, windowHeight, WEBGL) 
	
	interface = new Interface(RM);
	if (p5jsdraw1) {
		p5jsdraw1.setup();
	}
	frameRate(60)
	pixelDensity(1);


	interface.drawActive = false;
}
function mousePressed() {
	first_click = true;
	
}

function documentOnKeyPressed(event) {
	var keyCode = event.keyCode;
	let chrCode = keyCode - 48 * Math.floor(keyCode / 48);
	let chr = String.fromCharCode(keyCode);
//	console.log("BUTTON PRESSED" + chr);


	if (!disableDrawInterface) {

		if (chr == 'b') {
			RM.pgs[0].background(0);

			//RM.clean();
			RM.activeRender = -1;
			interface.cleanSliders();
			background(0);

		}
	
		for (var i = 0; i < 9; i++) {
			if (chr == str(i) && i <= RM.objts.length && i > 0) {
				RM.activeRender = i - 1;
//				console.log("Render active" + chr);
				interface.generateSliders();

				interface.drawActive = true;

			}
		}
	}
	for (var i = 0; i < 9; i++) {
		if (chr == str(i) && i <= RM.objts.length && i > 0) {
			RM.activeRender = i - 1;
		}
	}
}
function windowResized() {
	if (QUADCANVAS) {
		resizeCanvas(windowHeight, windowHeight);
	} else {
		resizeCanvas(windowWidth, windowHeight);
	}
	RM.resize();
}
function updateNONglobalUniforms() {
	//Pasar buffers por defecto 

	if (RM.objts.length > 0) {
		for (var i = 1; i < RM.objts.length; i++) {
			if (RM.objts[i] != null && RM.shorojb[i] == 0) {
				RM.objts[i].sh.setUniform("tx", RM.pgs[i - 1]);
			}
		}
	}
	

	//HARDCODING PARA FXHASH : 

	//No se que tan bien esta que esto lo haga todos los frames pero bueno. 
	for (let j = 0; j < RM.objts.length; j++) {
		if (RM.objts[j] != null) {
			for (let i = 0; i < RM.objts[j].localUniformsNames.length; i++) {
				for (let k = 0; k < Object.keys(uniforms_fxhash).length; k++) {
					if (RM.objts[j].localUniformsNames[i] == Object.keys(uniforms_fxhash)[k]) {
						RM.objts[j].sh.setUniform(RM.objts[j].localUniformsNames[i], Object.values(uniforms_fxhash)[k]);
					}

					for (let u = 0; u < interface.sliders.length; u++) {
						if (interface.sliders[u].name == Object.keys(uniforms_fxhash)[k]) {
							interface.sliders[u].isFxHashControlled = true;
							interface.sliders[u].value = Object.values(uniforms_fxhash)[k];
						}
					}
				}
			}
		}
	}
	
}
function draw() {

	background(0);
	updateNONglobalUniforms();
	translate(-width / 2, -height / 2, 0); //moves our drawing origin to the top left corner
	//interface.drawActive = false;
	RM.draw();
	RM.update();
	//updateNONglobalUniforms();
	if (cargoArchivo) {
	//	RM.draw();
	}
	interface.update();
	if (!disableDrawInterface) {
		interface.draw();
		fill(255);
	}

	fill(255, 255);
	for (let i = 0; i < touches.length; i++) {
		fill(255, 0, 0);
		ellipse(touches[i].x, touches[i].y, 10, 10);
	}

}
