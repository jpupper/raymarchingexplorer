class ManagerTemplate{
	constructor(name){
		
		this.name = name;
		this.dir = name;
		this.duration = 300;
		this.lasttime = 0;
		this.localUniformsNames = [];
		this.localUniformsValues = [];
        this.loaded = false;
        this.generate = true;
	}
}


//TEMPLATE PARTICLE FOR POSITION SPEED AND ALL 
class Particle{
	
	constructor(_p,
				_sp,
				_ac,
				_speedlimit){
		
		this.p = _p;
		this.sp = _sp;
		
		this.lifespeed = 0.7;
		this.life = 255;
		//this.sp = createVector(random(-10,10),random(-10,10));
		this.ac = _ac;
		this.speedlimit = _speedlimit;
		 
	//	this.prevp = createVector(0,0);
	}
	
	display(_ps){
		if(!_ps){	
			ellipse(this.p.x,this.p.y,10,10);
		}else{	
			_ps.ellipse(this.p.x,this.p.y,10,10);
		}
	}
	update(){
		this.sp.add(this.ac);
		this.sp.limit(this.speedlimit);
		this.p.add(this.sp);
		
		this.life -= this.lifespeed;
		
	    if(this.p.x > width){
		  this.p.x = 0;
	    }
	    if(this.p.x < 0){
		  this.p.x = width;
	    }
	    if(this.p.y > height){
		  this.p.y = 0;
	    }
	    if(this.p.y < 0){
		  this.p.y = height;
	    }
	}
	applyForce(f) {
		this.ac.add(f);
		this.sp.add(this.ac);
		this.ac.mult(0);
    }	
	seek(target){
		let desired = p5.Vector.sub(target,this.p);
		desired.setMag(this.speedlimit);
		let steering = p5.Vector.sub(desired,this.sp);
		this.applyForce(steering);
	}
	
	
}

function genR(min, max) {
	let result = 0;
	if (!max) { result = fxrand() * (min - 0) + 0; } else { result = fxrand() * (max - min) + min; }
	return result;
}


function getFromPalette(index) {

	palettec1 = [
		color(246, 80, 80),
		color(200, 229, 221),
		color(248, 233, 205),
		color(25, 200, 210, 255),
		color(29, 85, 212, 255),
		color(241, 246, 254),
		color(234, 178, 152),
		color(247, 181, 105),
		color(0),
		color(236, 47, 88),
		color('#5F4B8BFF'),
		color('#00203FFF'),
		color('#101820FF'),
		color('#101820FF')
	]

	palettec2 = [
		color(217, 185, 88),
		color(13, 155, 230),
		color(108, 51, 223),
		color(225, 35, 40, 255),
		color(183, 189, 74, 255),
		color(144, 50, 40),
		color(47, 114, 199),
		color(2, 106, 113),
		color(255, 255),
		color(50, 66, 110),
		color('#E69A8DFF'),
		color('#ADEFD1FF'),
		color('#FEE715FF'),
		color(100,255,100)

	]
	let indx = 0;

	if(!index){
		indx = floor(genR(palettec1.length));
	}else{
		indx = index;
	}
	console.log(genR(10));


	//	indx = 13
	//console.log(palettec1[0]);

	return cmanager = {
		c1: palettec1[indx],
		c2: palettec2[indx],
		index: indx
	};
}

function mapr(_value, _low2, _high2) {
	let val = _low2 + (_high2 - _low2) * (_value - 0.) / (1.0 - 0.);
	//float val = 0.1;
	return val;
}
function star(x, y, radius1, radius2, npoints) {
	let angle = TWO_PI / npoints;
	let halfAngle = angle / 2.0;
	beginShape();
	for (let a = 0; a < TWO_PI; a += angle) {
		let sx = x + cos(a) * radius2;
		let sy = y + sin(a) * radius2;
		vertex(sx, sy);
		sx = x + cos(a + halfAngle) * radius1;
		sy = y + sin(a + halfAngle) * radius1;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}

function star(x, y, radius1, radius2, npoints,_ps) {
	if(_ps){
		let angle = TWO_PI / npoints;
		let halfAngle = angle / 2.0;
		_ps.beginShape();
		for (let a = 0; a < TWO_PI; a += angle) {
			let sx = x + cos(a) * radius2;
			let sy = y + sin(a) * radius2;
			_ps.vertex(sx, sy);
			sx = x + cos(a + halfAngle) * radius1;
			sy = y + sin(a + halfAngle) * radius1;
			_ps.vertex(sx, sy);
		}
		_ps.endShape(CLOSE);
	}else{
		let angle = TWO_PI / npoints;
		let halfAngle = angle / 2.0;
		beginShape();
		for (let a = 0; a < TWO_PI; a += angle) {
			let sx = x + cos(a) * radius2;
			let sy = y + sin(a) * radius2;
			vertex(sx, sy);
			sx = x + cos(a + halfAngle) * radius1;
			sy = y + sin(a + halfAngle) * radius1;
			vertex(sx, sy);
		}
		endShape(CLOSE);
	}
	

}


//CORNER OVERRECT : 
function overRect(mx,my,x, y, w, h) {
	if (mx > x && mx < x+w && my > y && my < y+h) {
			return true;
	} else {
			return false;
	}
}

function shuffle2(array) {
	var i = array.length,
		j = 0,
		temp;
	while (i--) {

		j = Math.floor(fxrand() * (i + 1));

		// swap randomly chosen element with current element
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;

	}
	return array;
}


class imgManager {
	constructor(px, py, dir, cnt, w, h, _index) {
		//this.imgs = [];
		this.pos = createVector(px, py);
		this.index = 0;
		this.dir = dir;
		if (_index != null) {
			this.index = _index;
		} else {
			this.index = floor(genR(cnt))
		}
		let dir2 = dir + (1 + this.index).toString() + ".png";
		
		this.img = loadImage(dir2);
		this.w = w;
		this.h = h;
		this.flipx = false;
	}


	setIndex(_index) {
		this.index = _index;
		let dir2 = this.dir + (1 + this.index).toString() + ".png";

		this.img = loadImage(dir2);
    }
	display() {
		push();
		if (this.flipx) {
			scale(-1, 1)
			image(this.img, -this.pos.x - this.w / 2, this.pos.y, this.w, this.h);
		} else {
			image(this.img, this.pos.x, this.pos.y, this.w, this.h);
		}
		pop();
	}
	setPos(x, y) {
		this.pos.x = x;
		this.pos.y = y;
	}
	setW(w) {
		this.w = w;
	}
	setH(h) {
		this.h = h;
	}

	imgW() {
		return this.img.width;
	}
	imgH() {
		return this.img.height;
	}
}

//Esta es para levantar la de ride
class imgManager2 {
	constructor(px, py, dir,  w, h, _index) {
		//this.imgs = [];
		this.pos = createVector(px, py);
		
		let dir2 = dir + ".png";

		this.img = loadImage(dir2);
		this.w = w;
		this.h = h;
		this.flipx = false;
	}

	display() {
		push();
		if (this.flipx) {
			scale(-1, 1)
			image(this.img, -this.pos.x - this.w / 2, this.pos.y, this.w, this.h);
		} else {
			image(this.img, this.pos.x, this.pos.y, this.w, this.h);
		}
		pop();
	}
	setPos(x, y) {
		this.pos.x = x;
		this.pos.y = y;
	}
	setW(w) {
		this.w = w;
	}
	setH(h) {
		this.h = h;
	}

	imgW() {
		return this.img.width;
	}
	imgH() {
		return this.img.height;
	}
}

class AnimatedLine {
	constructor(x1, y1, x2, y2, segmentLength, spaceLength, size) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.segmentLength = segmentLength;
		this.spaceLength = spaceLength;
		this.size = size;
		// Calculate length
		this.L = sqrt(
			pow((this.x1 - this.x2), 2) +
			pow((this.y1 - this.y2), 2));
		//  console.log(this.L)

		// calculate angle
		this.S = atan2(this.y2 - this.y1, this.x2 - this.x1)

		// calculate number of segments
		this.numS = this.L / (this.segmentLength + this.spaceLength)

		this.beginningLength = 0;
	}

	move(rate) {
		this.beginningLength += rate
		if (this.beginningLength >= this.segmentLength + this.spaceLength) {
			this.beginningLength = 0;
		}
	}


	display() {
		if (this.beginningLength > this.spaceLength) {
			this.webGLline(this.x1,
				this.y1,
				this.x1 + (this.beginningLength - this.spaceLength) * cos(this.S),
				this.y1 + (this.beginningLength - this.spaceLength) * sin(this.S)
			)
		}

		for (let i = 0; i < this.numS; i++) {
			var distCheck = sqrt(
				pow(
					(this.segmentLength + this.spaceLength) * (i + 1)
					* cos(this.S) - this.spaceLength * cos(this.S)
					+ this.beginningLength * cos(this.S), 2)
				+ pow((this.segmentLength + this.spaceLength) * (i + 1)
					* sin(this.S) - this.spaceLength * sin(this.S)
					+ this.beginningLength * sin(this.S), 2))
			if (distCheck <= this.L) {
				this.webGLline(
					this.x1 + (this.segmentLength + this.spaceLength) * i
					* cos(this.S) + this.beginningLength * cos(this.S),
					this.y1 + (this.segmentLength + this.spaceLength) * i
					* sin(this.S) + this.beginningLength * sin(this.S),
					this.x1 + (this.segmentLength + this.spaceLength) * (i + 1)
					* cos(this.S) - this.spaceLength * cos(this.S)
					+ this.beginningLength * cos(this.S),
					this.y1 + (this.segmentLength + this.spaceLength) * (i + 1)
					* sin(this.S) - this.spaceLength * sin(this.S)
					+ this.beginningLength * sin(this.S)
				)
			} else {
				var distCheck =
					sqrt(
						pow((this.segmentLength + this.spaceLength) * i
							* cos(this.S) + this.beginningLength * cos(this.S), 2)
						+ pow((this.segmentLength + this.spaceLength) * i
							* sin(this.S) + this.beginningLength * sin(this.S), 2))
				if (distCheck < this.L) {
					this.webGLline(
						this.x1 + (this.segmentLength + this.spaceLength) * i
						* cos(this.S) + this.beginningLength * cos(this.S),
						this.y1 + (this.segmentLength + this.spaceLength) * i
						* sin(this.S) + this.beginningLength * sin(this.S),
						this.x2, this.y2
					)
				}
			}
		}
	}
	webGLline(_x1, _y1, _x2, _y2) {
		push();
		translate(_x1, _y1);
		rotate(atan2(_y1 - _y2, _x1 - _x2));
		rect(0, 0, this.size, 2);
		pop();
	}
}

function distanciarColor(col, dist) {
	let rnd1 = genR(1);
	let rnd2 = genR(1);
	let v1 = dist * rnd1;
	let v2 = dist * (1-rnd1);
	let v3 = (v1 + v2) * rnd2;
	v1 *= 1 - rnd2;
	v2 *= 1 - rnd2;
	let r = red(col);
	let g = green(col);
	let b = blue(col);
	let a = alpha(col);
  //  console.log(v1,v2,v3);
	return color(r + v1, g + v2, b + v3, a)  
  }
  p5.Vector.prototype.rotateAxis = function (angleXY, angleXZ, angleYZ) {
	let vec2D;
	let vec3D = this;
	vec2D = createVector(vec3D.x, vec3D.y);
	vec2D.rotate(angleXY);
	vec3D.set(vec2D.x, vec2D.y, vec3D.z);
	vec2D = createVector(vec3D.x, vec3D.z);
	vec2D.rotate(angleXZ);
	vec3D.set(vec2D.x, vec3D.y, vec2D.y);
	vec2D = createVector(vec3D.y, vec3D.z);
	vec2D.rotate(angleYZ);
	vec3D.set(vec3D.x, vec2D.x, vec2D.y);
	return vec3D;
  };
  
  p5.Color.prototype.rotate = function (angleRG, angleRB, angleGB) {
	let col = this;
	let vec;
	if (col.x == undefined) {
	  vec = createVector(col._array[0], col._array[1], col._array[2]);
	} else {
	  vec = createVector(col.x, col.y, col.z);
	}
	vec.rotateAxis(angleRG, angleRB, angleGB);
	col.x = vec.x;
	col.y = vec.y;
	col.z = vec.z;
	col.setRed(abs(col.x));
	col.setGreen(abs(col.y));
	col.setBlue(abs(col.z));
	return col;
  };

function irnd(e, a) {
    return floor(rnd(e, a))
}
function rnd(e, a) {
    return fxHashExist ? e + fxrand() * a : random(e, a)
}