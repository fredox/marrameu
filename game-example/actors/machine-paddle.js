import Canvas from '../../classes/canvas.js';
import Event from '../../classes/event.js';
import Paddle from './paddle.js';
import {Actor, RectangleActor} from '../../classes/actor.js';

class MachinePaddle extends Paddle {
	constructor(x, y, width, height) {
		super(x, y, width, height);
	}

	setBallReference(ball) {
		this.ball = ball;
	}

	init(gameData) {}

	update(gameData) {
		if (this.center().x < this.ball.x) {
			if ((this.x + this.width) < (gameData.xBoundRight)) {
				this.x = this.x + 2;
			}
		} else {
			if (this.x > gameData.xBoundLeft) {
				this.x = this.x -2;
			}
		}
	}
}

export default MachinePaddle;