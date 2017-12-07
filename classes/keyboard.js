import Canvas from './canvas.js';
import Event from './event.js';

class Keyboard {
	static addKeyboard() {
		window.addEventListener('keydown', Keyboard.keyPressed, false);
		window.addEventListener('keyup', Keyboard.keyReleased, false);
	}

	static keyPressed(event) {
		switch (event.code) {
			case 'ArrowLeft':
				Event.emit('keyboard.down.left');
	            break;
        	case 'ArrowUp':
	            Event.emit('keyboard.down.up');
	            break;
        	case 'ArrowRight':
	            Event.emit('keyboard.down.right');
	            break;
        	case 'ArrowDown':
	            Event.emit('keyboard.down.down');
	            break;
	        case 'z':
	        	Event.emit('keyboard.down.z');
	        	break;
	        case 'x':
	        	Event.emit('keyboard.down.x');
	        	break;
		}
	}

	static keyReleased(event) {
		switch (event.code) {
			case 'ArrowLeft':
				Event.emit('keyboard.up.left');
	            break;
        	case 'ArrowUp':
	            Event.emit('keyboard.up.up');
	            break;
        	case 'ArrowRight':
	            Event.emit('keyboard.up.right');
	            break;
        	case 'ArrowDown':
	            Event.emit('keyboard.up.down');
	            break;
	        case 'z':
	        	Event.emit('keyboard.up.z');
	        	break;
	        case 'x':
	        	Event.emit('keyboard.up.x');
	        	break;
		}
	}
}

export default Keyboard;