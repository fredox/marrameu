import Canvas from '../../classes/canvas.js';
import Event from '../../classes/event.js';
import {Actor, RectangleActor} from '../../classes/actor.js';

class Wall extends RectangleActor {
	constructor(x, y, width, height) {
		super(x, y, width, height);
	}

	draw(gameData) {
		var canvasContext = Canvas.getContext(gameData.canvasId);
		canvasContext.beginPath();
		canvasContext.fillStyle = "#2ABB9B";
		canvasContext.fillRect(this.x, this.y, this.width, this.height);
		canvasContext.closePath();
	}
}

export default Wall;