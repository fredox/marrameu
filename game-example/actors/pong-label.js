import {Actor} from '../../classes/actor.js';
import Canvas from '../../classes/canvas.js';
import Transition from '../../classes/transition.js';
import TransitionEvent from '../../classes/transition-event.js';

class PongLabel extends Actor {
	constructor(x, y, text, size) {
		super(x, y);
		this.x = x;
		this.y = y;
		this.size = size;
		this.text = text;
		this.pongTransitionTextSize = new TransitionEvent('pong-entry', 1280, 100, 'easeInCubic', 200);
	}

	draw(gameData) {
		
		var canvasContext = Canvas.getContext(gameData.canvasId);
		canvasContext.font      = "bold " + this.size + "px Arial";
		canvasContext.fillStyle = "white";
		canvasContext.textAlign = "center";
		canvasContext.fillText(this.text,this.x,this.y);
	}

	update(gameData) {
		this.size = this.pongTransitionTextSize.tick();
	}
}

export default PongLabel;