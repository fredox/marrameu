import Canvas from './canvas.js';
import Event from './event.js';

class Keyboard {
	static addKeyboard() {
		window.addEventListener('keydown', Keyboard.keyPressed, false);
	}

	static keyPressed(event) {
		switch (event.code) {
			case 'ArrowLeft':
				Event.emit('keyboard.left');
	            break;
        	case 'ArrowUp':
	            Event.emit('keyboard.up');
	            break;
        	case 'ArrowRight':
	            Event.emit('keyboard.right');
	            break;
        	case 'ArrowDown':
	            Event.emit('keyboard.down');
	            break;
	        case 'z':
	        	Event.emit('keyboard.z');
	        	break;
	        case 'x':
	        	Event.emot('keyboard.x');
	        	break;
		}
	}
}

export default Keyboard;