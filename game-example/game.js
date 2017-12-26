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
import GridHandler from       '../classes/grid-handler.js';

var gameData = {
	'canvasId':'game', 
	'score':{'game':{'player':0,'machine':0}, 'matches':{'player':0,'machine':0}},
	'ballFriction':0.5,
	'screen': {'width':Screen.width(), 'height':Screen.height()}
};

intro();

Event.on('startGame', function(data){
	game();
});

function game() {
	var gh = new GridHandler(Screen.width(), Screen.height());

	var PaddleSize = {
		width: gh.size(8),
		height: gh.size(1)
	}

	var WallSize = {
		width: gh.size(1),
		height: gh.size(39)
	}

	var xBoundLeft  = gh.marginLeftRight + WallSize.width;
	var xBoundRight = Screen.width() - gh.marginLeftRight -  WallSize.width;

	var playerPos  = gh.pos(3, 33);
	var machinePos = gh.pos(3, 3);

	var playerPaddle  = new Paddle(playerPos.x, playerPos.y, PaddleSize.width, PaddleSize.height);
	var machinePaddle = new MachinePaddle(machinePos.x, machinePos.y, PaddleSize.width, PaddleSize.height);

	var ball = new Ball(0, 0, gh.size(1), gh.size(1));
	ball.setFriction(gameData.ballFriction);
	machinePaddle.setBallReference(ball);

	var leftWall  = new Wall(gh.marginLeftRight, gh.marginTopBottom, WallSize.width, WallSize.height);
	var rightWall = new Wall(xBoundRight, gh.marginTopBottom, WallSize.width, WallSize.height);

	gameData.xBoundLeft  = xBoundLeft;
	gameData.xBoundRight = xBoundRight;

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
	var gh = new GridHandler(Screen.width(), Screen.height());
	var gameDataIntro = {'canvasId':'intro','screen': {'width':Screen.width(), 'height':Screen.height()}};
	var pongLabel = new PongLabel(Screen.width()/2, Screen.height()/2, 'PONG', 1280);
	var marrameuLabel = new MarrameuLabel(Screen.width()/2, Screen.height()/2 + gh.size(4), 'by Marrameu Games', 20);
	var intro = new GameMachine(gameDataIntro,[pongLabel, marrameuLabel]);

	var tapStartGame = new Label(Screen.width()/2, Screen.height()/2 + gh.size(8), 'Tap to Start Or press key "z"', 20, 'Arial', '#008668');


	intro.initGame();

	Event.on('transition.pong-entry', function(data){
		if (data.type == 'end') {
			intro.actors.push(tapStartGame);
			Event.on('touch.' + gameDataIntro.canvasId, function(data) {
				document.getElementById("intro").style.zIndex = "1";
				intro.stopGame();
				Event.emit('startGame');
			});
			Event.on('keyboard.down.z', function(data) {
				document.getElementById("intro").style.zIndex = "1";
				intro.stopGame();
				Event.emit('startGame');
			});
		}
	});

	intro.run();
	intro.startGame();
}



