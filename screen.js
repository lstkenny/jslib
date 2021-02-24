import { DataSet } from "./../../jslib/dataset.js"

class Screen extends DataSet {

	constructor(config) {
		super()
		this.setConfig(config)
		this.init()
	}
	setConfig(config) {
		this.set("config", Object.assign({
			"container": "body",
			"width": 100,
			"height": 100,
			"size": 5,
		}, config))
	}
	init() {
		this.setCanvas()
		this.setLayer(0)
	}
	setCanvas() {
		this.cnv = document.createElement("canvas")
		this.cnv.width = this.config.width
		this.cnv.height = this.config.height
		this.cnv.style.width = this.config.width * this.config.size + "px"
		this.cnv.style.height = this.config.height * this.config.size + "px"
		this.cnv.style.imageRendering = "pixelated"
		this.ctx = this.cnv.getContext("2d")
		document.querySelector(this.config.container).appendChild(this.cnv)
	}
	setLayer(layer) {
		this.set("layer", parseInt(layer))
	}
	setColor(color) {
		if (color) {
			this.set("color", color)
			this.ctx.strokeStyle = color
		}
	}
	line(x1, y1, x2, y2, color = false) {
		this.setColor(color)
		this.ctx.beginPath()
		this.ctx.moveTo(x1, y1)
		this.ctx.lineTo(x2, y2)
		this.ctx.stroke()
	}
}

screen = new Screen({
	"width": 100,
	"height": 100,
	"size": 4
})

screen.line(10, 10, 90, 90, "#000")