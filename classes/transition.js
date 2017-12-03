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

export default Transition;