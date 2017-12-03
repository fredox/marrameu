import Screen from './screen.js';

class Canvas {

	static init(canvasId) { 
		Canvas.clear(canvasId);
	}

	static clear(canvasId, width=false, height=false) {
		var context = Canvas.getContext(canvasId);
		context.canvas.width  = width ? width : Screen.width();
  		context.canvas.height = height ? height : Screen.height();
	}

	static getCanvas(canvasId) {
		return document.getElementById(canvasId);
	}

	static getContext(canvasId) {
		var canvas  = Canvas.getCanvas(canvasId);
		var context = canvas.getContext('2d');

		return context;
	}

	static rotateContext(canvasId, centerX, centerY, angle) {
		var context = Canvas.getContext(canvasId);

		context.translate(x, y);
		context.rotate(angle * Math.PI / 180);
		context.translate(-x, -y);
	}
}

export default Canvas;