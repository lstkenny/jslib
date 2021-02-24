export { Controls }

class Controls {
	constructor(target) {
		this.target = target
		this.target.addEventListener("resize", this.resize)
	}
	resize() {
		this.target._boundingClientRect = false
	}
	getMousePos(e) {
		if (!this.target._boundingClientRect) {
			this.target._boundingClientRect = this.target.getBoundingClientRect()
		}
		return {
			"x": e.clientX - this.target._boundingClientRect.left,
			"y": e.clientY - this.target._boundingClientRect.top
		}
	}
	listen(events, callback) {
		if (typeof events == "string") {
			events = [events]
		}
		if (!Array.isArray(events)) {
			return
		}
		events.forEach(event => {
			this.target.addEventListener(event, callback)
		})
	}
	mouseMove(callback) {
		this.listen(["mousemove", "touchmove"], e => {
			callback(this.getMousePos(e))
		})
	}
	mouseDown(callback) {
		this.listen(["mousedown", "touchstart"], e => {
			callback(this.getMousePos(e))
		})
	}
	mouseUp(callback) {
		this.listen(["mouseup", "touchend"], e => {
			callback(this.getMousePos(e))
		})
	}
}