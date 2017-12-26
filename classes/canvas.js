import Screen from './screen.js';

let CanvasList = {};

class Canvas {

	static init(canvasId) { 
		CanvasList[canvasId] = {};
		CanvasList[canvasId]['canvasObj'] = document.getElementById(canvasId);
		CanvasList[canvasId]['context']   = CanvasList[canvasId]['canvasObj'].getContext('2d');
		this.width  = Screen.width();
		this.height = Screen.height();
		Canvas.clear(canvasId);
	}

	static clear(canvasId, width=false, height=false) {
		var context = Canvas.getContext(canvasId);
		context.canvas.width  = width ? width : this.width;
  		context.canvas.height = height ? height : this.height;
	}

	static getCanvas(canvasId) {
		return CanvasList[canvasId]['canvasObj'];
	}

	static getContext(canvasId) {
		return CanvasList[canvasId]['context'];
	}

	static rotateContext(canvasId, centerX, centerY, angle) {
		var context = Canvas.getContext(canvasId);

		context.translate(x, y);
		context.rotate(angle * Math.PI / 180);
		context.translate(-x, -y);
	}
}

export default Canvas;