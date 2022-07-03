


//ooeXWvyzkUt7GbF7XTbwriWN2uRbrkqm9tGLRi9LWQQeuhPWk2s

class luzysombram{

	constructor(){
		this.cosos = [];
		this.name = "Luz y sombra";
		this.dir = "FedeM2";
		this.duration = 300;
		this.lasttime = 0;
		this.localUniformsNames = [];
		this.localUniformsValues = [];
        this.loaded = false;
        this.generate = true;
        let ama = genR(120, 200);
        this.br = genR(1, 3);

      //  this.c1 = color(genR(255), genR(255), genR(255));

        
        this.RM = new RenderManager();
        this.RM.addShader('shaders/generative/luzysombra3.frag', 0, "dwdas.frag");
        this.RM.addShader('shaders/imageprocessing/bloom2.frag', 1, "bloom2.frag");
        this.lerpm = 0;
		
		this.posz = genR(-30.0,30.0);
		this.posx = genR(-30.0,30.0);
		this.posy = genR(-30.0,30.0);
		this.roteje =0.0;
        this.look = createVector(0.0,0.0,1.0);
      // this.look = createVector(genR(-TWO_PI,TWO_PI),genR(-TWO_PI,TWO_PI),genR(-TWO_PI,TWO_PI));
      
    }

    setup() {
        this.RM.objts[0].sh.setUniform("escenaactiva", 2.0);
        this.RM.objts[0].sh.setUniform("lmode",4.0);
    }
    draw(_ps) {		
        _ps.imageMode(CENTER);
		if(!this.loaded){				
            _ps.background(0, 0, 0);
            this.RM.update();
        
        this.RM.objts[0].sh.setUniform("escenaactiva", uniforms_fxhash.escena);
        this.RM.objts[0].sh.setUniform("lmode",uniforms_fxhash.modoluz);


        this.RM.objts[0].sh.setUniform("tx", this.img1);
        this.RM.objts[0].sh.setUniform("lerpm", this.lerpm);
        this.RM.objts[0].sh.setUniform("posz", this.posz);
        this.RM.objts[0].sh.setUniform("posx", this.posx);
        this.RM.objts[0].sh.setUniform("posy", this.posy);
        this.RM.objts[0].sh.setUniform("roteje", this.roteje);

        this.RM.objts[0].sh.setUniform("lookx", this.look.x);
        this.RM.objts[0].sh.setUniform("looky", this.look.y);
        this.RM.objts[0].sh.setUniform("lookz", this.look.z);
        this.RM.objts[1].sh.setUniform("tx", this.RM.pgs[0]);
            
            
        this.RM.updateDrawOnBuffers();
        _ps.image(this.RM.pgs[1],width/2,height/2);

        }
        //console.log("AS");
        if(mouseIsPressed){
            this.lerpm+=0.01;
        }else{
            this.lerpm-=0.01;
        }
		
		if(keyIsPressed){
			if(key == 'w'){
				this.posz+=0.1*this.look.z*2.;
                this.posx+=0.1*this.look.x*2.;
                this.posy+=0.1*this.look.y*2.;
               // this.posz+=0.4;
                
			}
            if(key == 's'){
                this.posz-=0.1*this.look.z;
                this.posx-=0.1*this.look.x;
                this.posy-=0.1*this.look.y;
			}
			if(key == 'q'){
                this.rotateyz(0.01);
            }
            if(key == 'e'){
                this.rotateyz(-0.01);
            }
			if(key == 'd'){
               this.rotatexz(0.01);
			}
            if(key == 'a'){
                this.rotatexz(-0.01);
            }         
		}
	    this.lerpm = constrain(this.lerpm,0.0,1.0);
    }
    rotatexz(val){
        let vaux = createVector(this.look.x,this.look.z);
        vaux.rotate(val);
        this.look.set(vaux.x,this.look.y,vaux.y);
    }
    rotateyz(val){
        let vaux = createVector(this.look.y,this.look.z);
        vaux.rotate(val);
        this.look.set(this.look.x,vaux.x,vaux.y);
    }

    update() {

    }
    runAudio(){

    
    }

}
