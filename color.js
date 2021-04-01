class Color {
	constructor() {
		this.setColor.apply(this, arguments)
	}
	setColor(input) {
		if (Array.isArray(input)) {
			this.fromValues(input)
		} else if (!isNaN(parseInt(input))) {
			this.fromValues(arguments)
		} else if (input.substr(0, 1) == "#") {
			this.fromHEX(input)
		} else if (input.substr(0, 3).toLowerCase() == "rgb") {
			this.fromRGBA(input)
		} else {
			this.fromTitle(input)
		}
	}
	fromValues(values) {
		["r", "g", "b", "a"].forEach((color, index) => {
			if (typeof values[index] !== "undefined") {
				this[color] = parseInt(values[index])
			} else {
				this[color] = (color == "a") ? 1 : parseInt(values[0])
			}
		})
	}
	fromHEX(hex) {
		let collen = (hex.length - 1) / 3
		let fact = [17, 1, 0.062272][collen - 1]
		this.r = Math.round(parseInt(hex.substr(1, collen), 16) * fact)
		this.g = Math.round(parseInt(hex.substr(1 + collen, collen), 16) * fact)
		this.b = Math.round(parseInt(hex.substr(1 + 2 * collen, collen), 16) * fact)
		this.a = 1
	}
	fromRGBA(rgba) {
		let values = rgba.split("(")[1].split(")")[0].split(",").map(x => +x)
		this.fromValues(values)
	}
	fromTitle(title) {
		let colors = {
			"black": [0, 0, 0],
			"white": [255, 255, 255],
			"red": [255, 0, 0],
			"lime": [0, 255, 0],
			"blue": [0, 0, 255],
			"yellow": [255, 255, 0],
			"cyan": [0, 255, 255],
			"aqua": [0, 255, 255],
			"magenta": [255, 0, 255],
			"fuchsia": [255, 0, 255],
			"silver": [192, 192, 192],
			"gray": [128, 128, 128],
			"maroon": [128, 0, 0],
			"olive": [128, 128, 0],
			"green": [0, 128, 0],
			"purple": [128, 0, 128],
			"teal": [0, 128, 128],
			"navy": [0, 0, 128],
		}
		title = title.toLowerCase()
 		if (colors[title]) {
 			this.fromValues(colors[title])
 		}
	}
	colorBetween(color, alpha) {
		let c = []
		c[0] = this.r * (1 - alpha) + (alpha) * color.r
		c[1] = this.g * (1 - alpha) + (alpha) * color.g
		c[2] = this.b * (1 - alpha) + (alpha) * color.b
		return c
	}
	decToHex(dec) { 
		let hex = parseInt(dec).toString(16)
		if (hex.length < 2) {
			hex = "0" + hex
		}
		return hex
	}
	toHex() {
		return '#' + this.decToHex(this.r) + this.decToHex(this.g) + this.decToHex(this.b)
	}
	toRgba() {
		return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")"
	}
}
export default Color