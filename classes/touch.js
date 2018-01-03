import Canvas from './canvas.js';
import Event from './event.js';

class Touch {
	static init() {
		Touch.canvasList = {};
	}

	static addTouchToCanvas(canvasId) {
		var canvas = Canvas.getCanvas(canvasId);
		Touch.canvasList[canvasId] = {};

		Touch.canvasList[canvasId].previous = {x:0, y:0};
		Touch.canvasList[canvasId].current  = {x:0, y:0};
	
		canvas.addEventListener('touchmove', Touch.touchMove, false);
		canvas.addEventListener('touchstart', Touch.touchStart, false);
		canvas.addEventListener('touchend', Touch.touchEnd, false);
	}

	static touchMove(event) {
		var canvasId = event.target.id;
		event.preventDefault(); 

		Touch.canvasList[canvasId].previous.x = Touch.canvasList[canvasId].current.x;
		Touch.canvasList[canvasId].previous.y = Touch.canvasList[canvasId].current.y;
		Touch.canvasList[canvasId].current.x  = event.touches[0].clientX;
		Touch.canvasList[canvasId].current.y  = event.touches[0].clientY;

		// Support for multitouch
		Touch.canvasList[canvasId].touches = event.touches;

		console.log(Touch.canvasList);

		Event.emit('touch.' + canvasId, {type:'touchMove', canvasId:canvasId, touch:Touch.canvasList[canvasId]});
	}

	static touchStart(event) {
		var canvasId = event.target.id;
		event.preventDefault(); 

		Touch.canvasList[canvasId].current.x  = event.touches[0].clientX;
		Touch.canvasList[canvasId].current.y  = event.touches[0].clientY;

		Event.emit('touch.' + canvasId, {type:'touchStart', canvasId:canvasId, touch:Touch.canvasList[canvasId]});
	}

	static touchEnd(event) {
		var canvasId = event.target.id;
		event.preventDefault(); 

		Event.emit('touch.' + canvasId, {type:'touchEnd', canvasId:canvasId, touch:Touch.canvasList[canvasId]});
	}
}

export default Touch;