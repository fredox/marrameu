import RectangleActor from    '../classes/actor.js';
import GameMachine from       '../classes/game-machine.js';
import Paddle from            './actors/paddle.js';
import MachinePaddle from     './actors/machine-paddle.js';
import Ball from              './actors/ball.js';
import Wall from			  './actors/wall.js';
import EventBallCollider from './event-ball-collider.js';
import Collider from		  '../classes/collider.js';
import Screen from			  '../classes/screen.js';
import PongEventSound from    './pong-event-sound.js';
import Score from			  './score.js';
import PongLabel from		  './actors/pong-label.js';
import MarrameuLabel from     './actors/marrameu-label.js';
import Label from			  '../classes/label.js';
import Event from			  '../classes/event.js';

var gameData = {
	'canvasId':'game', 
	'score':{'game':{'player':0,'machine':0}, 'matches':{'player':0,'machine':0}},
	'ballFriction':0.5,
	'wallWidth': 10,
	'screen': {'width':Screen.width(), 'height':Screen.height()}
};



intro();

Event.on('startGame', function(data){
	game();
});

function game() {
	var playerPaddle  = new Paddle(50, 540);
	var machinePaddle = new MachinePaddle(50, 50);

	var ball = new Ball(0, 0);
	ball.setFriction(gameData.ballFriction);
	machinePaddle.setBallReference(ball);

	var leftWall  = new Wall(0, 0, gameData.wallWidth, Screen.height());
	var rightWall = new Wall(Screen.width() - gameData.wallWidth, 0, gameData.wallWidth, Screen.height())

	var eventCollider = new EventBallCollider();
	eventCollider.setElements(ball, [playerPaddle, machinePaddle, leftWall, rightWall]);

	var score = new Score();

	var pong = new GameMachine(gameData, [score, eventCollider, playerPaddle, machinePaddle, ball, leftWall, rightWall]);

	pong.initGame();
	PongEventSound.init();

	pong.run();
	pong.startGame();
}

function intro() {
	var gameDataIntro = {'canvasId':'intro','screen': {'width':Screen.width(), 'height':Screen.height()}};
	var pongLabel = new PongLabel(Screen.width()/2, Screen.height()/2, 'PONG', 1280);
	var marrameuLabel = new MarrameuLabel(240, 350, 'by Marrameu Games', 20);
	var intro = new GameMachine(gameDataIntro,[pongLabel, marrameuLabel]);

	var tapStartGame = new Label(180, 420, 'Tap to Start', 30, 'Arial', 'white');


	intro.initGame();

	Event.on('transition.pong-entry', function(data){
		if (data.type == 'end') {
			intro.actors.push(tapStartGame);
			Event.on('touch.' + gameDataIntro.canvasId, function(data) {
				document.getElementById("intro").style.zIndex = "1";
				intro.stopGame();
				Event.emit('startGame');
			});
		}
	});

	intro.run();
	intro.startGame();
}



