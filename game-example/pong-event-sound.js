import Sound from '../classes/sound.js';
import Event from '../classes/event.js';

class PongEventSound {
	static init() {
		Sound.setSound('ball-paddle', './sounds/player-sound.mp3');
		Sound.setSound('ball-machine-paddle', './sounds/machine-sound.mp3');
		Sound.setSound('ball-wall', './sounds/wall-sound.mp3');

		Event.on('ball-collision', function(data) {
			if (data.collidesAgainst.constructor.name == 'Paddle')
				Sound.play('ball-paddle');
			if (data.collidesAgainst.constructor.name == 'MachinePaddle')
				Sound.play('ball-machine-paddle');
			if (data.collidesAgainst.constructor.name == 'Wall')
				Sound.play('ball-wall');
		});
	}
}

export default PongEventSound;