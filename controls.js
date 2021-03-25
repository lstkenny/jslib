class Controls {
	constructor(target) {
		this.target = target
		this.target.addEventListener("resize", this.resize)
	}
	resize() {
		this.target._bcr = false
	}
	getMousePos(e) {
		if (!this.target._bcr) {
			this.target._bcr = this.target.getBoundingClientRect()
		}
		return {
			"x": e.clientX - this.target._bcr.left,
			"y": e.clientY - this.target._bcr.top
		}
	}
	getArguments(event, e) {
		switch (event) {
			case "mousemove":
			case "mousedown":
			case "mouseup":
			case "touchmove":
			case "touchstart":
			case "touchend":
				return [this.getMousePos(e), e]
				break
			default:
				return [e]
		}
	}
	listen(eventsList, callback) {
		if (typeof eventsList == "string") {
			eventsList = [eventsList]
		}
		if (!Array.isArray(eventsList)) {
			return
		}
		eventsList.forEach(eventName => 
			this.target.addEventListener(eventName, e => 
				callback.apply(null, 
					this.getArguments(eventName, e)
				)
			)
		)
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
	wheel(callback) {
		this.listen(["wheel"], callback)
	}
}

export default Controls