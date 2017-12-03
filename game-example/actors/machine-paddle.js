import Canvas from '../../classes/canvas.js';
import Event from '../../classes/event.js';
import Paddle from './paddle.js';
import {Actor, RectangleActor} from '../../classes/actor.js';

class MachinePaddle extends Paddle {
	constructor(x, y) {
		super(x, y, 150, 20);
	}

	setBallReference(ball) {
		this.ball = ball;
	}

	init(gameData) {}

	update(gameData) {
		if (this.center().x < this.ball.x)
			this.x = this.x + 2;
		else
			if (this.x >= 2)
				this.x = this.x -2;
	}
}

export default MachinePaddle;