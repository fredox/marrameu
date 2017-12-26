/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Event {
	static init() {
		Event.handlers = {};
	}

	static emit(event, data={}) {
		if (Event.handlers.hasOwnProperty(event))
        	for (var callback of Event.handlers[event])
            	callback(data);
	}

	static on(event, callback) {
		if (typeof Event.handlers[event] != 'undefined')
            Event.handlers[event].push(callback);
        else
            Event.handlers[event] = [callback];
	}

	static remove() {
		delete Event.handlers[event];
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Event);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screen_js__ = __webpack_require__(3);


let CanvasList = {};

class Canvas {

	static init(canvasId) { 
		CanvasList[canvasId] = {};
		CanvasList[canvasId]['canvasObj'] = document.getElementById(canvasId);
		CanvasList[canvasId]['context']   = CanvasList[canvasId]['canvasObj'].getContext('2d');
		this.width  = __WEBPACK_IMPORTED_MODULE_0__screen_js__["a" /* default */].width();
		this.height = __WEBPACK_IMPORTED_MODULE_0__screen_js__["a" /* default */].height();
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

/* harmony default export */ __webpack_exports__["a"] = (Canvas);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Actor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RectangleActor; });
/* unused harmony export CircleActor */
class Actor {
	constructor() {}

	debug() {}
	init() {}
	draw() {}
	update() {}
}

class RectangleActor extends Actor {

	constructor(x, y, width, height, angle=0) {
		super();
		this.x = x;
		this.y = y;
		this.width  = width;
		this.height = height;
		this.angle = angle;
		this.boundingBox = 'RECTANGLE';
	}

	center() {
		return {
			x:(this.x + this.width/2),
			y:(this.y + this.height/2)
		};
	}
}

class CircleActor extends Actor {

	constructor(x, y, radius) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.boundingBox = 'CIRCLE';
	}

	center() {
		return {
			x:(this.x + radius),
			y:(this.y + radius)
		};	
	}
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Screen {
	static width()  { return window.innerWidth; }
	static height() { return window.innerHeight; }
	static center() { return {x:Screen.width()/2, y:Screen.height()/2}; }
 }

 /* harmony default export */ __webpack_exports__["a"] = (Screen);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Transition {
	constructor(initValue, endValue, method, nticks) {
		this.initValue   = initValue;
		this.endValue    = endValue;
		this.method      = method;
		this.delta       = endValue - initValue;
		this.currentTick = 0;
		this.transitions = {};
		this.nticks      = nticks;
	    this.increment   = 1/nticks;
		
		this.transitions.methods = {
			linear: 		function (t) { return t },
			easeInQuad: 	function (t) { return t*t },
			easeOutQuad: 	function (t) { return t*(2-t) },
			easeInCubic: 	function (t) { return t*t*t },
			easeInElastic: 	function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
			easeInElastic2: function (t) { return (.01 - .01 / t) * Math.sin(25 * t) + 1 }
		};
	}

	tick() {
		if (this.currentTick > this.nticks) {
			return this.endValue;
		}

		var result = this.delta * this.transitions.methods[this.method](this.currentTick * this.increment) + this.initValue;
		this.currentTick++;

		return result; 
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Transition);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sound {

	static init() {
		this.sounds = {};
	}

	static setSound(name, src) {
		this.sounds[name] = new Audio(src);
	}

	static play(name) {
		this.sounds[name].play();
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Sound);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_event_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_actor_js__ = __webpack_require__(2);




class Paddle extends __WEBPACK_IMPORTED_MODULE_2__classes_actor_js__["b" /* RectangleActor */] {
	constructor(x, y, width, height) {
		super(x, y, width, height);
		this.xDirection = 0;
		this.moving = false;
	}

	init(gameData) {
		var paddle = this;
		__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].on('touch.' + gameData.canvasId, function(data) {
			if (data.type != 'touchMove')
				return;

			if (data.touch.previous.x > data.touch.current.x) {
				paddle.xDirection = -1;
				if (paddle.x >= gameData.xBoundLeft)
					paddle.x = paddle.x - 5;
			}

			if (data.touch.previous.x < data.touch.current.x) {
				paddle.xDirection = 1;
				if ((paddle.x + paddle.width) < (gameData.xBoundRight))
					paddle.x = paddle.x + 5;
			}
		});

		__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].on('keyboard.down.left', function(){
			if (!paddle.moving){
				paddle.moving = true;
				paddle.xDirection = -1;
			}
		});

		__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].on('keyboard.down.right', function(){
			if (!paddle.moving){
				paddle.moving = true;
				paddle.xDirection = 1;
			}
		});

		__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].on('keyboard.up.left', function(){paddle.moving = false;});
		__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].on('keyboard.up.right', function(){ paddle.moving = false;});
	}

	draw(gameData) {
		var canvasContext = __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__["a" /* default */].getContext(gameData.canvasId);
		canvasContext.beginPath();
		canvasContext.fillStyle = "#2ABB9B";
		canvasContext.fillRect(this.x, this.y, this.width, this.height);
		canvasContext.closePath();
	}

	update(gameData) {
		if (!this.moving) 
			return;
		else {
			if ((this.xDirection == 1) && ((this.x + this.width) < (gameData.xBoundRight)))
				this.x += 5;
			else if (this.x > gameData.xBoundLeft)
				this.x -= 5; 
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Paddle);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Collider {

	static collides(objA) {
		return (objB) => {
			return Collider.areColliding(objA, objB);
		}
	}
	
	static areColliding(objA, objB) {
		if ((typeof objA.angle == 'undefined') || (typeof objB.angle == 'undefined'))
			return false;

		if ((objA.angle != 0) || (objB.angle != 0)) {
			console.log('[ERROR] Collisions with rotated elements not suported yet.');
		}

		var collisionType = objA.boundingBox + '-' + objB.boundingBox;
		
		switch (collisionType) {
			case 'RECTANGLE-RECTANGLE':
				return Collider.checkCollisionBetweenRectangles(objA, objB);
				break;
			case 'RECTANGLE-CIRCLE':
				return Collider.checkCollisionBetweenCircleAndRectangle(objB, objA);
				break;
			case 'CIRCLE-RECTANGLE':
				return Collider.checkCollisionBetweenCircleAndRectangle(objA, objB);
				break;
			case 'CIRCLE-CIRCLE':
				return Collider.checkCollisionBetweenCircles(objA, objB);
				break;
			default:
				console.log('bounding box not suported');
				return false;
		}
	};
	
	static checkCollisionBetweenRectangles(rectangleObjA, rectangleObjB) {
		if (rectangleObjA.x < rectangleObjB.x + rectangleObjB.width &&
		   rectangleObjA.x + rectangleObjA.width > rectangleObjB.x &&
		   rectangleObjA.y < rectangleObjB.y + rectangleObjB.height &&
		   rectangleObjA.height + rectangleObjA.y > rectangleObjB.y) {
    		return true;
		}

		return false;
	}
	
	static checkCollisionBetweenCircles(circleObjA, circleObjB) {
	}
	
	
	static checkCollisionBetweenCircleAndRectangle(circleObj, rectangleObj) {
	}

	static getCollisionVector(objA, objB) {
		return {x:objA.center().x-objB.center().x, y:objA.center().y-objB.center().y};
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Collider);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_transition_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_event_js__ = __webpack_require__(0);



class TransitionEvent {

	constructor(transitionName, initValue, endValue, method, nticks) {
		this.transitionName = transitionName;
		this.initValue      = initValue;
		this.endValue       = endValue;
		this.method         = method;
		this.nticks         = nticks;
		this.transition     = new __WEBPACK_IMPORTED_MODULE_0__classes_transition_js__["a" /* default */](initValue, endValue, method, nticks);
	}

	tick() {
		if (this.transition.currentTick == 0) {
			__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].emit('transition.' + this.transitionName, {type:'start'});
		}

		var result = this.transition.tick();

		if (this.transition.currentTick == this.nticks) {
			__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].emit('transition.' + this.transitionName, {type:'end'});
		}

		return result;
	}

}

/* harmony default export */ __webpack_exports__["a"] = (TransitionEvent);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_actor_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_game_machine_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actors_paddle_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actors_machine_paddle_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actors_ball_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actors_wall_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__event_ball_collider_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__classes_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__classes_screen_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pong_event_sound_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__score_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__actors_pong_label_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__actors_marrameu_label_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__classes_label_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__classes_event_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__classes_grid_handler_js__ = __webpack_require__(23);

















var gameData = {
	'canvasId':'game', 
	'score':{'game':{'player':0,'machine':0}, 'matches':{'player':0,'machine':0}},
	'ballFriction':0.5,
	'screen': {'width':__WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].width(), 'height':__WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].height()}
};

intro();

__WEBPACK_IMPORTED_MODULE_14__classes_event_js__["a" /* default */].on('startGame', function(data){
	game();
});

function game() {
	var gh = new __WEBPACK_IMPORTED_MODULE_15__classes_grid_handler_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].width(), __WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].height());

	var PaddleSize = {
		width: gh.size(8),
		height: gh.size(1)
	}

	var WallSize = {
		width: gh.size(1),
		height: gh.size(39)
	}

	var xBoundLeft  = gh.marginLeftRight + WallSize.width;
	var xBoundRight = __WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].width() - gh.marginLeftRight -  WallSize.width;

	var playerPos  = gh.pos(3, 33);
	var machinePos = gh.pos(3, 3);

	var playerPaddle  = new __WEBPACK_IMPORTED_MODULE_2__actors_paddle_js__["a" /* default */](playerPos.x, playerPos.y, PaddleSize.width, PaddleSize.height);
	var machinePaddle = new __WEBPACK_IMPORTED_MODULE_3__actors_machine_paddle_js__["a" /* default */](machinePos.x, machinePos.y, PaddleSize.width, PaddleSize.height);

	var ball = new __WEBPACK_IMPORTED_MODULE_4__actors_ball_js__["a" /* default */](0, 0, gh.size(1), gh.size(1));
	ball.setFriction(gameData.ballFriction);
	machinePaddle.setBallReference(ball);

	var leftWall  = new __WEBPACK_IMPORTED_MODULE_5__actors_wall_js__["a" /* default */](gh.marginLeftRight, gh.marginTopBottom, WallSize.width, WallSize.height);
	var rightWall = new __WEBPACK_IMPORTED_MODULE_5__actors_wall_js__["a" /* default */](xBoundRight, gh.marginTopBottom, WallSize.width, WallSize.height);

	gameData.xBoundLeft  = xBoundLeft;
	gameData.xBoundRight = xBoundRight;

	var eventCollider = new __WEBPACK_IMPORTED_MODULE_6__event_ball_collider_js__["a" /* default */]();
	eventCollider.setElements(ball, [playerPaddle, machinePaddle, leftWall, rightWall]);

	var score = new __WEBPACK_IMPORTED_MODULE_10__score_js__["a" /* default */]();

	var pong = new __WEBPACK_IMPORTED_MODULE_1__classes_game_machine_js__["a" /* default */](gameData, [score, eventCollider, playerPaddle, machinePaddle, ball, leftWall, rightWall]);

	pong.initGame();
	__WEBPACK_IMPORTED_MODULE_9__pong_event_sound_js__["a" /* default */].init();

	pong.run();
	pong.startGame();
}

function intro() {
	var gh = new __WEBPACK_IMPORTED_MODULE_15__classes_grid_handler_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].width(), __WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].height());
	var gameDataIntro = {'canvasId':'intro','screen': {'width':__WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].width(), 'height':__WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].height()}};
	var pongLabel = new __WEBPACK_IMPORTED_MODULE_11__actors_pong_label_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].width()/2, __WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].height()/2, 'PONG', 1280);
	var marrameuLabel = new __WEBPACK_IMPORTED_MODULE_12__actors_marrameu_label_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].width()/2, __WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].height()/2 + gh.size(4), 'by Marrameu Games', 20);
	var intro = new __WEBPACK_IMPORTED_MODULE_1__classes_game_machine_js__["a" /* default */](gameDataIntro,[pongLabel, marrameuLabel]);

	var tapStartGame = new __WEBPACK_IMPORTED_MODULE_13__classes_label_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].width()/2, __WEBPACK_IMPORTED_MODULE_8__classes_screen_js__["a" /* default */].height()/2 + gh.size(8), 'Tap to Start Or press key "z"', 20, 'Arial', '#008668');


	intro.initGame();

	__WEBPACK_IMPORTED_MODULE_14__classes_event_js__["a" /* default */].on('transition.pong-entry', function(data){
		if (data.type == 'end') {
			intro.actors.push(tapStartGame);
			__WEBPACK_IMPORTED_MODULE_14__classes_event_js__["a" /* default */].on('touch.' + gameDataIntro.canvasId, function(data) {
				document.getElementById("intro").style.zIndex = "1";
				intro.stopGame();
				__WEBPACK_IMPORTED_MODULE_14__classes_event_js__["a" /* default */].emit('startGame');
			});
			__WEBPACK_IMPORTED_MODULE_14__classes_event_js__["a" /* default */].on('keyboard.down.z', function(data) {
				document.getElementById("intro").style.zIndex = "1";
				intro.stopGame();
				__WEBPACK_IMPORTED_MODULE_14__classes_event_js__["a" /* default */].emit('startGame');
			});
		}
	});

	intro.run();
	intro.startGame();
}





/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_touch_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_event_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_screen_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_sound_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_keyboard_js__ = __webpack_require__(12);







class GameMachine {

	constructor(gameData, actors=[], isRunning=false, startTick=0) {
        this.gameData = gameData;
        this.actors   = actors;
        this.running  = isRunning;
        this.nTick    = startTick;

        var gameMachine = this;

        // Debug mode press any key to stop game and see vars.
        window.addEventListener( "keypress", function(event) {
            if (event.key != 'd')
                return;

            console.log(gameMachine);
            console.log(event);
            gameMachine.applyToActors('debug');
            gameMachine.pauseGame();
        });
    }

    initGame() {
        __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__["a" /* default */].init(this.gameData.canvasId); 
        __WEBPACK_IMPORTED_MODULE_1__classes_touch_js__["a" /* default */].init();
        __WEBPACK_IMPORTED_MODULE_1__classes_touch_js__["a" /* default */].addTouchToCanvas(this.gameData.canvasId);
        __WEBPACK_IMPORTED_MODULE_5__classes_keyboard_js__["a" /* default */].addKeyboard();
        __WEBPACK_IMPORTED_MODULE_2__classes_event_js__["a" /* default */].init();
        __WEBPACK_IMPORTED_MODULE_4__classes_sound_js__["a" /* default */].init();
         

        this.init();
    }

    applyToActors(functionName) {
    	for (var actor of this.actors) {
  			actor[functionName](this.gameData);
		}
    }

    beforeUpdateFunction() {
        var ctx = __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__["a" /* default */].getContext(this.gameData.canvasId);
        ctx.clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_3__classes_screen_js__["a" /* default */].width(), __WEBPACK_IMPORTED_MODULE_3__classes_screen_js__["a" /* default */].height());
    }

    init()   { this.applyToActors('init'); }
    update() { this.applyToActors('update'); }
    draw()   { this.applyToActors('draw'); }

    run() {
    	if (this.running) {
            this.beforeUpdateFunction();
			this.update();
			this.draw();
			
			this.animationFrame = requestAnimationFrame(this.run.bind(this));
			this.gameData.tick  = this.nTick;
			this.nTick++;
		} 
    }

    stopGame() {
    	cancelAnimationFrame(this.animationFrame);
		this.running = false;
    }

    continueGame() {
    	this.running = true;
		this.run();
    }

    startGame() {
    	this.continueGame();
    }

    pauseGame() {
        if (this.running) 
            this.stopGame();
        else
            this.continueGame();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (GameMachine);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_js__ = __webpack_require__(0);



class Touch {
	static init() {
		Touch.canvasList = {};
	}

	static addTouchToCanvas(canvasId) {
		var canvas = __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* default */].getCanvas(canvasId);
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

		__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('touch.' + canvasId, {type:'touchMove', canvasId:canvasId, touch:Touch.canvasList[canvasId]});
	}

	static touchStart(event) {
		var canvasId = event.target.id;
		event.preventDefault(); 

		Touch.canvasList[canvasId].current.x  = event.touches[0].clientX;
		Touch.canvasList[canvasId].current.y  = event.touches[0].clientY;

		__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('touch.' + canvasId, {type:'touchStart', canvasId:canvasId, touch:Touch.canvasList[canvasId]});
	}

	static touchEnd(event) {
		var canvasId = event.target.id;
		event.preventDefault(); 

		__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('touch.' + canvasId, {type:'touchEnd', canvasId:canvasId, touch:Touch.canvasList[canvasId]});
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Touch);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_js__ = __webpack_require__(0);



class Keyboard {
	static addKeyboard() {
		window.addEventListener('keydown', Keyboard.keyPressed, false);
		window.addEventListener('keyup', Keyboard.keyReleased, false);
	}

	static keyPressed(event) {
		switch (event.code) {
			case 'ArrowLeft':
				__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.down.left');
	            break;
        	case 'ArrowUp':
	            __WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.down.up');
	            break;
        	case 'ArrowRight':
	            __WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.down.right');
	            break;
        	case 'ArrowDown':
	            __WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.down.down');
	            break;
	        case 'KeyZ':
	        	__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.down.z');
	        	break;
	        case 'KeyX':
	        	__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.down.x');
	        	break;
		}
	}

	static keyReleased(event) {
		switch (event.code) {
			case 'ArrowLeft':
				__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.up.left');
	            break;
        	case 'ArrowUp':
	            __WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.up.up');
	            break;
        	case 'ArrowRight':
	            __WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.up.right');
	            break;
        	case 'ArrowDown':
	            __WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.up.down');
	            break;
	        case 'z':
	        	__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.up.z');
	        	break;
	        case 'x':
	        	__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* default */].emit('keyboard.up.x');
	        	break;
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Keyboard);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_event_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paddle_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_actor_js__ = __webpack_require__(2);





class MachinePaddle extends __WEBPACK_IMPORTED_MODULE_2__paddle_js__["a" /* default */] {
	constructor(x, y, width, height) {
		super(x, y, width, height);
	}

	setBallReference(ball) {
		this.ball = ball;
	}

	init(gameData) {}

	update(gameData) {
		if (this.center().x < this.ball.x) {
			if ((this.x + this.width) < (gameData.xBoundRight)) {
				this.x = this.x + 2;
			}
		} else {
			if (this.x > gameData.xBoundLeft) {
				this.x = this.x -2;
			}
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (MachinePaddle);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_event_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_actor_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_maths_js__ = __webpack_require__(15);





class Ball extends __WEBPACK_IMPORTED_MODULE_2__classes_actor_js__["b" /* RectangleActor */] {
	constructor(x, y, size) {
		super(x, y, size, size);
		this.size = size;
		this.friction = 0;
	}

	setFriction(friction) {
		this.friction = friction;
	}

	initPositionAndDirection(gameData) {
		var xQuarterChnunk = gameData.screen.width/4;
		this.x  = Math.round(__WEBPACK_IMPORTED_MODULE_3__classes_maths_js__["a" /* default */].getRandomBetween(gameData.xBoundLeft, 2*xQuarterChnunk));
		this.y  = Math.round(gameData.screen.height/2);

		var velocity = Math.round(this.size/6);

		this.dx = Math.round(__WEBPACK_IMPORTED_MODULE_3__classes_maths_js__["a" /* default */].getRandomBetween(-velocity, velocity));
		this.dy = Math.round(__WEBPACK_IMPORTED_MODULE_3__classes_maths_js__["a" /* default */].getRandomBetween(velocity/2, velocity));
	}

	init(gameData) {
		this.initPositionAndDirection(gameData);
		var ball = this;
		this.canvasId = gameData.canvasId;
		__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].on('ball-collision', function(eventData) {
			var delta = 0;
			if (ball.eventPaddleCollision(eventData)) {
				delta   = eventData.collidesAgainst.xDirection * ball.friction;
				ball.dy = (ball.dy + delta) * -1;
				ball.dx = ball.dx + delta;
			}

			if (ball.eventWallCollision(eventData)) {
				ball.dx = ball.dx * -1;
			}
		});
	}

	draw(gameData) {
		var canvasContext = __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__["a" /* default */].getContext(gameData.canvasId);
		canvasContext.fillStyle = "#2ABB9B";
		canvasContext.fillRect(this.x, this.y, this.width, this.height);
	}

	update(gameData) {
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;

		if (this.y < 0)
			__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].emit('point-to-player');

		if (this.y > gameData.screen.height)
			__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].emit('point-to-machine');

		if ((this.y < 0) || (this.y > gameData.screen.height)) {
			this.initPositionAndDirection(gameData);
		}
	}

	eventPaddleCollision(eventData) {
		var PaddleCollision        = (eventData.collidesAgainst.constructor.name == 'Paddle');
		var PaddleMachineCollision = (eventData.collidesAgainst.constructor.name == 'MachinePaddle');
		return (PaddleCollision || PaddleMachineCollision);
	}	

	eventWallCollision(eventData) {
		return (eventData.collidesAgainst.constructor.name == 'Wall');
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Ball);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Maths {
	static getRandomBetween(min, max) {
	    return Math.random() * (max - min) + min;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Maths);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_event_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_actor_js__ = __webpack_require__(2);




class Wall extends __WEBPACK_IMPORTED_MODULE_2__classes_actor_js__["b" /* RectangleActor */] {
	constructor(x, y, width, height) {
		super(x, y, width, height);
	}

	draw(gameData) {
		var canvasContext = __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__["a" /* default */].getContext(gameData.canvasId);
		canvasContext.beginPath();
		canvasContext.fillStyle = "#2ABB9B";
		canvasContext.fillRect(this.x, this.y, this.width, this.height);
		canvasContext.closePath();
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Wall);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_actor_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_event_js__ = __webpack_require__(0);




// TODO: Make an abstraction of this class to make an event collider of whatever element.
class EventBallCollider extends __WEBPACK_IMPORTED_MODULE_0__classes_actor_js__["a" /* Actor */] {

	setElements(ball, collisionableElements) {
		this.collisionableElements = collisionableElements;
		this.ball = ball;
	}

	init() {}
	draw() {}

	update() {
		var ballCollidesWith = __WEBPACK_IMPORTED_MODULE_1__classes_collider_js__["a" /* default */].collides(this.ball);
		for (var element of this.collisionableElements) {
  			if (ballCollidesWith(element)) {
  				var collisionData = {
  					vector:__WEBPACK_IMPORTED_MODULE_1__classes_collider_js__["a" /* default */].getCollisionVector(element, this.ball),
  					collidesAgainst:element
  				};
  				__WEBPACK_IMPORTED_MODULE_2__classes_event_js__["a" /* default */].emit('ball-collision', collisionData);
  			}
		}
	}

	debug() {
		var ballCollidesWith = __WEBPACK_IMPORTED_MODULE_1__classes_collider_js__["a" /* default */].collides(this.ball);
		for (var element of this.collisionableElements) {
  			if (ballCollidesWith(element))
  				console.log('[EventBallCollider][DEBUG] Ball Colides with ' + element.constructor.name + ' --> TRUE');
  			else
  				console.log('[EventBallCollider][DEBUG] Ball Colides with ' + element.constructor.name + ' --> FALSE');
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (EventBallCollider);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_sound_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_event_js__ = __webpack_require__(0);



class PongEventSound {
	static init() {
		__WEBPACK_IMPORTED_MODULE_0__classes_sound_js__["a" /* default */].setSound('ball-paddle', './sounds/player-sound.mp3');
		__WEBPACK_IMPORTED_MODULE_0__classes_sound_js__["a" /* default */].setSound('ball-machine-paddle', './sounds/machine-sound.mp3');
		__WEBPACK_IMPORTED_MODULE_0__classes_sound_js__["a" /* default */].setSound('ball-wall', './sounds/wall-sound.mp3');

		__WEBPACK_IMPORTED_MODULE_1__classes_event_js__["a" /* default */].on('ball-collision', function(data) {
			if (data.collidesAgainst.constructor.name == 'Paddle')
				__WEBPACK_IMPORTED_MODULE_0__classes_sound_js__["a" /* default */].play('ball-paddle');
			if (data.collidesAgainst.constructor.name == 'MachinePaddle')
				__WEBPACK_IMPORTED_MODULE_0__classes_sound_js__["a" /* default */].play('ball-machine-paddle');
			if (data.collidesAgainst.constructor.name == 'Wall')
				__WEBPACK_IMPORTED_MODULE_0__classes_sound_js__["a" /* default */].play('ball-wall');
		});
	}
}

/* harmony default export */ __webpack_exports__["a"] = (PongEventSound);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_actor_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_event_js__ = __webpack_require__(0);




class Score extends __WEBPACK_IMPORTED_MODULE_1__classes_actor_js__["a" /* Actor */] {
	init(gameData) {
		__WEBPACK_IMPORTED_MODULE_2__classes_event_js__["a" /* default */].on('point-to-player', function(data) {
			if (gameData.score.game.player == 45) {
				Score.resetGames(gameData);
				gameData.score.matches.player++;
				__WEBPACK_IMPORTED_MODULE_2__classes_event_js__["a" /* default */].emit('player-wins-match');
				return;
			}
			gameData.score.game.player = gameData.score.game.player + 15;
		});

		__WEBPACK_IMPORTED_MODULE_2__classes_event_js__["a" /* default */].on('point-to-machine', function(data) {
			if (gameData.score.game.machine == 45) {
				Score.resetGames(gameData);
				gameData.score.matches.machine++;
				__WEBPACK_IMPORTED_MODULE_2__classes_event_js__["a" /* default */].emit('machine-wins-match');
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
		var ctx=__WEBPACK_IMPORTED_MODULE_0__classes_canvas_js__["a" /* default */].getContext(gameData.canvasId);
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

/* harmony default export */ __webpack_exports__["a"] = (Score);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_actor_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_transition_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_transition_event_js__ = __webpack_require__(8);





class PongLabel extends __WEBPACK_IMPORTED_MODULE_0__classes_actor_js__["a" /* Actor */] {
	constructor(x, y, text, size) {
		super(x, y);
		this.x = x;
		this.y = y;
		this.size = size;
		this.text = text;
		this.alpha = 0;
		this.pongTransitionTextAlpha = new __WEBPACK_IMPORTED_MODULE_3__classes_transition_event_js__["a" /* default */]('pong-entry', 0, 1, 'easeInCubic', 200);
	}

	draw(gameData) {
		
		var canvasContext = __WEBPACK_IMPORTED_MODULE_1__classes_canvas_js__["a" /* default */].getContext(gameData.canvasId);
		canvasContext.font      = "bold 100px Arial";
		canvasContext.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		canvasContext.textAlign = "center";
		canvasContext.fillText(this.text,this.x,this.y);
	}

	update(gameData) {
		this.alpha = this.pongTransitionTextAlpha.tick();
	}
}

/* harmony default export */ __webpack_exports__["a"] = (PongLabel);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_actor_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_transition_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_transition_event_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_event_js__ = __webpack_require__(0);






class MarrameuLabel extends __WEBPACK_IMPORTED_MODULE_0__classes_actor_js__["a" /* Actor */] {
	constructor(x, y, text, size) {
		super(x, y);
		this.alpha = 0;
		this.x = x;
		this.y = y;
		this.size = size;
		this.text = text;
		this.transitionOn = false;
		this.transition = new __WEBPACK_IMPORTED_MODULE_2__classes_transition_js__["a" /* default */](0, 1, 'linear', 110);
	}

	init(gameData) {
		var marrameu = this;
		__WEBPACK_IMPORTED_MODULE_4__classes_event_js__["a" /* default */].on('transition.pong-entry', function(data) {
			if (data.type == 'end') {
				marrameu.transitionOn = true;
			}
		});
	}

	draw(gameData) {
		
		var canvasContext = __WEBPACK_IMPORTED_MODULE_1__classes_canvas_js__["a" /* default */].getContext(gameData.canvasId);
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

/* harmony default export */ __webpack_exports__["a"] = (MarrameuLabel);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actor_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas_js__ = __webpack_require__(1);



class Label extends __WEBPACK_IMPORTED_MODULE_0__actor_js__["a" /* Actor */] {
	constructor(x, y, text, size, font, color) {
		super(x, y);
		this.x = x;
		this.y = y;
		this.text = text;
		this.size  = size;
		this.font  = font;
		this.color = color;
	}

	draw(gameData) {
		var canvasContext = __WEBPACK_IMPORTED_MODULE_1__canvas_js__["a" /* default */].getContext(gameData.canvasId);
		canvasContext.font      = this.size + "px " + this.font;
		canvasContext.fillStyle = this.color;
		canvasContext.textAlign = "center";
		canvasContext.fillText(this.text,this.x,this.y);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Label);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GridHandler {
	constructor(width, height, type='golden-ratio-vertical') {
		this.width  = width;
		this.height = height;

		this.marginTopBottom = 0;
		this.marginLeftRight = 0;

		this.quadrantSize = 0;

		this.build(type);
	}

	build(type) {
		switch (type) {
			case 'golden-ratio-vertical':
				this.buildGoldenRatio();
				break;
			default:
				console.log('[ERROR] Grid type not suported.');
				return false;
		}
	}

	buildGoldenRatio() {
		// 39 quads height, 24 width (mobile friendly)
		this.quadrantSize = this.width/24;

		if ((this.quadrantSize * 39) > this.height) {
			this.quadrantSize = this.height/39;
			this.marginLeftRight = (this.width - (this.quadrantSize * 24))/2;
		} else {
			this.marginTopBottom = (this.height - (this.quadrantSize * 39))/2;
		}		
	}

	size(n) {
		return n * this.quadrantSize;
	}

	pos(x, y) {
		return {
			x: this.marginLeftRight + (x * this.quadrantSize),
			y: this.marginTopBottom + (y * this.quadrantSize)
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (GridHandler);

/***/ })
/******/ ]);