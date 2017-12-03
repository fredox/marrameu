import Canvas from '../classes/canvas.js';
import Touch from '../classes/touch.js';
import Event from '../classes/event.js';
import Screen from '../classes/screen.js';
import Sound from '../classes/sound.js';
import Keyboard from '../classes/keyboard.js';

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
        Canvas.init(this.gameData.canvasId); 
        Touch.init();
        Touch.addTouchToCanvas(this.gameData.canvasId);
        Keyboard.addKeyboard();
        Event.init();
        Sound.init();
         

        this.init();
    }

    applyToActors(functionName) {
    	for (var actor of this.actors) {
  			actor[functionName](this.gameData);
		}
    }

    beforeUpdateFunction() {
        var ctx = Canvas.getContext(this.gameData.canvasId);
        ctx.clearRect(0, 0, Screen.width(), Screen.height());
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

export default GameMachine;