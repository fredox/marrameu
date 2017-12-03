import {Actor} from './actor.js';
import Canvas from './canvas.js';

class Label extends Actor {
	constructor(x, y, text, size, font, color) {
		super(x, y);
		this.x = x;
		this.y = y;
		this.text = text;
		this.size  = size;
		this.font  = font;
		this.color = color;
	}

	draw(gameData) {
		var canvasContext = Canvas.getContext(gameData.canvasId);
		canvasContext.font      = this.size + "px " + this.font;
		canvasContext.fillStyle = this.color;
		canvasContext.textAlign = "center";
		canvasContext.fillText(this.text,this.x,this.y);
	}
}

export default Label;