class Actor {
	constructor() {}

	debug() {}
	init() {}
	draw() {}
	update() {}
}

class RectangleActor extends Actor {

	constructor(x, y, width, height, angle=0) {
		super();
		this.x = x;
		this.y = y;
		this.width  = width;
		this.height = height;
		this.angle = angle;
		this.boundingBox = 'RECTANGLE';
	}

	center() {
		return {
			x:(this.x + this.width/2),
			y:(this.y + this.height/2)
		};
	}
}

class CircleActor extends Actor {

	constructor(x, y, radius) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.boundingBox = 'CIRCLE';
	}

	center() {
		return {
			x:(this.x + radius),
			y:(this.y + radius)
		};	
	}
}

export {
	Actor,
	RectangleActor,
	CircleActor
}