export { Sound }

class Sound {
	constructor(config = {}) {
		this.sounds = {}
		this.volume = config.volume || 0.05
	}
	addSound(sound, file) {
		this.sounds[sound] = new Audio(file)
	}
	play(sound) {
		let clone = this.sounds[sound].cloneNode(true)
		clone.volume = this.volume
		clone.play()
	}
}