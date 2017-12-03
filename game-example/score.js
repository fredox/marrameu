import Canvas from '../classes/canvas.js';
import {Actor} from '../classes/actor.js';
import Event from '../classes/event.js';

class Score extends Actor {
	init(gameData) {
		Event.on('point-to-player', function(data) {
			if (gameData.score.game.player == 45) {
				Score.resetGames(gameData);
				gameData.score.matches.player++;
				Event.emit('player-wins-match');
				return;
			}
			gameData.score.game.player = gameData.score.game.player + 15;
		});

		Event.on('point-to-machine', function(data) {
			if (gameData.score.game.machine == 45) {
				Score.resetGames(gameData);
				gameData.score.matches.machine++;
				Event.emit('machine-wins-match');
				return;
			}
			gameData.score.game.machine = gameData.score.game.machine + 15;
		});
	}

	static resetGames(gameData) {
		gameData.score.game.player  = 0;
		gameData.score.game.machine = 0;
	}

	draw(gameData) {
		var ctx=Canvas.getContext(gameData.canvasId);
		ctx.beginPath();
		ctx.setLineDash([15, 8]);
		ctx.lineWidth=8;
		ctx.moveTo(0, gameData.screen.height/2);
		ctx.lineTo(gameData.screen.width, gameData.screen.height/2);
		ctx.strokeStyle = '#95a5a6';
		ctx.stroke();

		ctx.font = "65px Courier New";
		var playerScore  = gameData.score.game.player == 0 ? '00' : gameData.score.game.player;
		var machineScore = gameData.score.game.machine == 0 ? '00' : gameData.score.game.machine;

		ctx.fillStyle = '#95a5a6';
		ctx.fillText(playerScore, gameData.screen.width - 110, gameData.screen.height/2 + 65);
		ctx.fillText(machineScore, gameData.screen.width - 110, gameData.screen.height/2 - 30);

		ctx.fillText(gameData.score.matches.player, 20, gameData.screen.height/2 + 65);
		ctx.fillText(gameData.score.matches.machine, 20, gameData.screen.height/2 - 30);
	}
}	

export default Score;