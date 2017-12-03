import Canvas from '../../classes/canvas.js';
import Event from '../../classes/event.js';
import {Actor, RectangleActor} from '../../classes/actor.js';
import Maths from '../../classes/maths.js';

class Ball extends RectangleActor {
	constructor(x, y) {
		super(x, y, 20, 20);
		this.friction = 0;
	}

	setFriction(friction) {
		this.friction = friction;
	}

	initPositionAndDirection(gameData) {
		var xQuarterChnunk = gameData.screen.width/4;
		this.x  = Maths.getRandomBetween(xQuarterChnunk, 2*xQuarterChnunk);
		this.y  = gameData.screen.height/2;
		this.dx = Maths.getRandomBetween(-2, 2);
		this.dy = Maths.getRandomBetween(1,2);
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