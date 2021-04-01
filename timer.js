class Timer {
	constructor(callbacks, step) {
		this.callbacks = callbacks
		this.inc = step || 1 / 120
		this.last = 0
		this.acc = 0
		this.tick = 0
		this.frameId = 0
	}
	onFrame(time) {
		if (this.last !== null) {
			this.acc += (time - this.last) / 1000
			while (this.acc > this.inc) {
				this.callbacks.update(this.inc, this.tick)
				this.tick++
				this.acc -= this.inc
			}
		}
		this.last = time
		this.callbacks.render()
		if (this.frameId) {
			this.frameId = requestAnimationFrame(this.onFrame.bind(this))
		}
	}
	start() {
		this.last = null
		this.frameId = requestAnimationFrame(this.onFrame.bind(this))
	}
	stop() {
		cancelAnimationFrame(this.frameId)
		this.frameId = 0
	}
}
export default Timer