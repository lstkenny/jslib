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
			console.log(event)
			this.target.addEventListener(event, e => callback.call(this, this.getMousePos(e)))
		})
	}
	mouseMove(callback) {
		this.listen(["mousemove", "touchmove"], callback)
	}
	mouseDown(callback) {
		this.listen(["mousedown", "touchstart"], callback)
	}
	mouseUp(callback) {
		this.listen(["mouseup", "touchend"], callback)
	}
}

export default Controls