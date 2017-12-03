import Transition from '../classes/transition.js';
import Event from '../classes/event.js';

class TransitionEvent {

	constructor(transitionName, initValue, endValue, method, nticks) {
		this.transitionName = transitionName;
		this.initValue      = initValue;
		this.endValue       = endValue;
		this.method         = method;
		this.nticks         = nticks;
		this.transition     = new Transition(initValue, endValue, method, nticks);
	}

	tick() {
		if (this.transition.currentTick == 0) {
			Event.emit('transition.' + this.transitionName, {type:'start'});
		}

		var result = this.transition.tick();

		if (this.transition.currentTick == this.nticks) {
			Event.emit('transition.' + this.transitionName, {type:'end'});
		}

		return result;
	}

}

export default TransitionEvent;