import Canvas from '../../classes/canvas.js';
import Event from '../../classes/event.js';
import {Actor, RectangleActor} from '../../classes/actor.js';

class Paddle extends RectangleActor {
	constructor(x, y) {
		super(x, y, 130, 20);
		this.xDirection = 0;
	}

	init(gameData) {
		var paddle = this;
		Event.on('touch.' + gameData.canvasId, function(data) {
			if (data.type != 'touchMove')
				return;



			if (data.touch.previous.x > data.touch.current.x) {
				paddle.xDirection = -1;
				if (paddle.x >= 5)
					paddle.x = paddle.x - 5;
			}

			if (data.touch.previous.x < data.touch.current.x) {
				paddle.xDirection = 1;
				if ((paddle.x + paddle.width) < (gameData.screen.width-5))
					paddle.x = paddle.x + 5;
			}
		});

		Event.on('keyboard.left', function(){
			paddle.xDirection = -1;
			if (paddle.x >= 5)
				paddle.x = paddle.x - 5;
		});

		Event.on('keyboard.right', function(){
			paddle.xDirection = 1;
			if ((paddle.x + paddle.width) < (gameData.screen.width-5))
				paddle.x = paddle.x + 5;
		});
	}

	draw(gameData) {
		var canvasContext = Canvas.getContext(gameData.canvasId);
		canvasContext.beginPath();
		canvasContext.fillStyle = "#2ABB9B";
		canvasContext.fillRect(this.x, this.y, this.width, this.height);
		canvasContext.closePath();
	}

	update(gameData) {}
}

export default Paddle;