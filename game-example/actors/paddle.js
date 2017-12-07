import Canvas from '../../classes/canvas.js';
import Event from '../../classes/event.js';
import {Actor, RectangleActor} from '../../classes/actor.js';

class Paddle extends RectangleActor {
	constructor(x, y) {
		super(x, y, 130, 20);
		this.xDirection = 0;
		this.moving = false;
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

		Event.on('keyboard.down.left', function(){
			if (!paddle.moving){
				paddle.moving = true;
				paddle.xDirection = -1;
			}
		});

		Event.on('keyboard.down.right', function(){
			if (!paddle.moving){
				paddle.moving = true;
				paddle.xDirection = 1;
			}
		});

		Event.on('keyboard.up.left', function(){paddle.moving = false;});
		Event.on('keyboard.up.right', function(){ paddle.moving = false;});
	}

	draw(gameData) {
		var canvasContext = Canvas.getContext(gameData.canvasId);
		canvasContext.beginPath();
		canvasContext.fillStyle = "#2ABB9B";
		canvasContext.fillRect(this.x, this.y, this.width, this.height);
		canvasContext.closePath();
	}

	update(gameData) {
		if (!this.moving) 
			return;
		else {
			if ((this.xDirection == 1) && ((this.x + this.width) < (gameData.screen.width-5)))
				this.x += 5;
			else if (this.x > 1)
				this.x -= 5; 
		}
	}
}

export default Paddle;