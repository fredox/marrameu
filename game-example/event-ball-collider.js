import {Actor} from '../classes/actor.js';
import Collider from '../classes/collider.js';
import Event from '../classes/event.js';

// TODO: Make an abstraction of this class to make an event collider of whatever element.
class EventBallCollider extends Actor {

	setElements(ball, collisionableElements) {
		this.collisionableElements = collisionableElements;
		this.ball = ball;
	}

	init() {}
	draw() {}

	update() {
		var ballCollidesWith = Collider.collides(this.ball);
		for (var element of this.collisionableElements) {
  			if (ballCollidesWith(element)) {
  				var collisionData = {
  					vector:Collider.getCollisionVector(element, this.ball),
  					collidesAgainst:element
  				};
  				Event.emit('ball-collision', collisionData);
  			}
		}
	}

	debug() {
		var ballCollidesWith = Collider.collides(this.ball);
		for (var element of this.collisionableElements) {
  			if (ballCollidesWith(element))
  				console.log('[EventBallCollider][DEBUG] Ball Colides with ' + element.constructor.name + ' --> TRUE');
  			else
  				console.log('[EventBallCollider][DEBUG] Ball Colides with ' + element.constructor.name + ' --> FALSE');
		}
	}
}

export default EventBallCollider;