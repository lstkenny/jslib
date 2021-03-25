class Matrix {
	constructor(cols, rows) {
		this.cols = cols
		this.rows = rows
		this.cells = new Array(cols * rows)
	}
	invalidPos(col, row) {
		return (
			col < 0 ||
			col >= this.cols.length ||
			row < 0 || 
			row >= this.rows.length
		)
	}
	indexFromPos(col, row) {
		if (this.invalidPos(col, row)) {
			return null
		}
		return col + row * this.cols
	}
	indexToPos(index) {
		const col = index % this.cols
		const row = Math.floor(index / this.cols)
		if (this.invalidPos(col, row)) {
			return null
		}
		return { col, row }
	}
	fromArray(array) {
		if (Array.isArray(array[0])) {
			this.update((col, row) => array[col][row])
		} else {
			this.update((col, row, i) => array[i])
		}
	}
	forEach(callback) {
		for (let i = 0; i < this.cells.length; i++) {
			const { col, row } = this.indexToPos(i)
			callback.call(this, col, row, this.cells[i], i)
		}
	}
	update(callback) {
		for (let i = 0; i < this.cells.length; i++) {
			const { col, row } = this.indexToPos(i)
			this.cells[i] = callback.call(this, col, row, i)
		}
	}
	flip(axis) {
		if (axis !== "x"  && axis !== "y") {
			return
		}
		const cells = new Array(this.cols * this.rows)
		this.forEach((col, row, value, i) => {
			const _col = (axis === "x") ? col : this.cols - 1 - col
			const _row = (axis === "y") ? row : this.rows - 1 - row
			const _i = this.indexFromPos(_col, _row)
			cells[_i] = value
		})
		this.fromArray(cells)
	}
	transpose() {
		const cells = new Array(this.cols * this.rows)
		this.forEach((col, row, value, i) => {
			const _i = this.indexFromPos(row, col)
			cells[_i] = value
		})
		const buff = this.cols
		this.cols = this.rows
		this.rows = buff
		this.fromArray(cells)
	}
	rotate(dir) {
		if (dir !== "cw" && dir !== "ccw") {
			return
		}
		const flips = {
			cw: "y",
			ccw: "x"
		}
		this.transpose()
		this.flip(flips[dir])
	}
	find(value) {
		for (let i = 0; i < this.cells.length; i++) {
			if (this.cells[i] === value) {
				return this.indexToPos(i)
			}
		}
	}
	set(col, row, value) {
		const index = this.indexFromPos(col, row)
		if (index !== null) {
			this.cells[index] = value
		}
	}
	get(col, row) {
		return this.cells[this.indexFromPos(col, row)]
	}
}

export default Matrix