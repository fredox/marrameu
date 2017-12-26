import Canvas from '../../classes/canvas.js';
import Event from '../../classes/event.js';
import {Actor, RectangleActor} from '../../classes/actor.js';
import Maths from '../../classes/maths.js';

class Ball extends RectangleActor {
	constructor(x, y, size) {
		super(x, y, size, size);
		this.size = size;
		this.friction = 0;
	}

	setFriction(friction) {
		this.friction = friction;
	}

	initPositionAndDirection(gameData) {
		var xQuarterChnunk = gameData.screen.width/4;
		this.x  = Math.round(Maths.getRandomBetween(gameData.xBoundLeft, 2*xQuarterChnunk));
		this.y  = Math.round(gameData.screen.height/2);

		var velocity = Math.round(this.size/6);

		this.dx = Math.round(Maths.getRandomBetween(-velocity, velocity));
		this.dy = Math.round(Maths.getRandomBetween(velocity/2, velocity));
	}

	init(gameData) {
		this.initPositionAndDirection(gameData);
		var ball = this;
		this.canvasId = gameData.canvasId;
		Event.on('ball-collision', function(eventData) {
			var delta = 0;
			if (ball.eventPaddleCollision(eventData)) {
				delta   = eventData.collidesAgainst.xDirection * ball.friction;
				ball.dy = (ball.dy + delta) * -1;
				ball.dx = ball.dx + delta;
			}

			if (ball.eventWallCollision(eventData)) {
				ball.dx = ball.dx * -1;
			}
		});
	}

	draw(gameData) {
		var canvasContext = Canvas.getContext(gameData.canvasId);
		canvasContext.fillStyle = "#2ABB9B";
		canvasContext.fillRect(this.x, this.y, this.width, this.height);
	}

	update(gameData) {
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;

		if (this.y < 0)
			Event.emit('point-to-player');

		if (this.y > gameData.screen.height)
			Event.emit('point-to-machine');

		if ((this.y < 0) || (this.y > gameData.screen.height)) {
			this.initPositionAndDirection(gameData);
		}
	}

	eventPaddleCollision(eventData) {
		var PaddleCollision        = (eventData.collidesAgainst.constructor.name == 'Paddle');
		var PaddleMachineCollision = (eventData.collidesAgainst.constructor.name == 'MachinePaddle');
		return (PaddleCollision || PaddleMachineCollision);
	}	

	eventWallCollision(eventData) {
		return (eventData.collidesAgainst.constructor.name == 'Wall');
	}
}

export default Ball;