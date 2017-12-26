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
		this.alpha = 0;
		this.pongTransitionTextAlpha = new TransitionEvent('pong-entry', 0, 1, 'easeInCubic', 200);
	}

	draw(gameData) {
		
		var canvasContext = Canvas.getContext(gameData.canvasId);
		canvasContext.font      = "bold 100px Arial";
		canvasContext.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		canvasContext.textAlign = "center";
		canvasContext.fillText(this.text,this.x,this.y);
	}

	update(gameData) {
		this.alpha = this.pongTransitionTextAlpha.tick();
	}
}

export default PongLabel;