import {Actor} from '../../classes/actor.js';
import Canvas from '../../classes/canvas.js';
import Transition from '../../classes/transition.js';
import TransitionEvent from '../../classes/transition-event.js';
import Event from '../../classes/event.js';

class MarrameuLabel extends Actor {
	constructor(x, y, text, size) {
		super(x, y);
		this.alpha = 0;
		this.x = x;
		this.y = y;
		this.size = size;
		this.text = text;
		this.transitionOn = false;
		this.transition = new Transition(0, 1, 'linear', 110);
	}

	init(gameData) {
		var marrameu = this;
		Event.on('transition.pong-entry', function(data) {
			if (data.type == 'end') {
				marrameu.transitionOn = true;
			}
		});
	}

	draw(gameData) {
		
		var canvasContext = Canvas.getContext(gameData.canvasId);
		canvasContext.font      = this.size + "px Arial";
		canvasContext.fillStyle = "rgba(240, 249, 145, " + this.alpha + ")";
		canvasContext.textAlign = "center";
		canvasContext.fillText(this.text,this.x,this.y);
	}

	update(gameData) {
		if (this.transitionOn)
			this.alpha = this.transition.tick();
	}
}

export default MarrameuLabel;