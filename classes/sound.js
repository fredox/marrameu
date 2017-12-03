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

export default Sound;