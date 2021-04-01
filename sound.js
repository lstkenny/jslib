class Sound {
	constructor(config = {}) {
		this.sounds = {}
		this.volume = config.volume || 0.05
	}
	addSound(sound, file) {
		try {
			this.sounds[sound] = new Audio(file)
		} catch(e) {
			console.error(e)
		}
	}
	play(name) {
		const sound = this.sounds[name]
		if (sound) {
			const clone = sound.cloneNode(true)
			clone.volume = this.volume
			clone.play()
		}
	}
}
export default Sound