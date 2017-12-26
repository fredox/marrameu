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

export default GridHandler;