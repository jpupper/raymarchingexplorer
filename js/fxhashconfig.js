uniforms_fxhash = [];
u_fxhash = [];


function setFxhash_luzYSombra(){

	uniforms_fxhash.escena = Math.floor(genR(5));
	
	uniforms_fxhash.modoluz = 0;
//	uniforms_fxhash.modoluz =0;
	if(genR(1) < .15){
		uniforms_fxhash.modoluz = 1;
	}
	if(genR(1) < .15){
		uniforms_fxhash.modoluz = 2;
	}
	
	
	let stescena = "bubbles";
	
	if(uniforms_fxhash.escena == 0){
		 stescena = "bubbles";
	}else if(uniforms_fxhash.escena == 1){
			stescena = "Cube fractals";
	}else if(uniforms_fxhash.escena == 2){
		stescena = "Worms";
	}else if(uniforms_fxhash.escena == 3){
		stescena = "Rotating piramids";
	}else if(uniforms_fxhash.escena == 4){
		stescena = "Rings";
	}
		
	let lightmode = "bubbles";
	
	if(uniforms_fxhash.modoluz == 0){
		lightmode = "Light of two colors";
	}else if(uniforms_fxhash.modoluz == 1){
		lightmode = "Line party";
	}else if(uniforms_fxhash.modoluz == 2){
		lightmode = "HSB D r e a m s.";
	}
	
	//uniforms_fxhash.escena = 4;
	//uniforms_fxhash.modoluz= 1;
	window.$fxhashFeatures = {
		"Scene ": stescena,
		"Light Blend " : lightmode
	} 
	console.log("ESTO LO CORRE DEBERIA ESCRIBIR LOS FEATURES");
}




