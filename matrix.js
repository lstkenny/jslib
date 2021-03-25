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
	forEach(callback) {
		for (let i = 0; i < this.cells.length; i++) {
			const { col, row } = this.indexToPos(i)
			callback.call(this, col, row, this.cells[i])
		}
	}
	update(callback) {
		for (let i = 0; i < this.cells.length; i++) {
			const { col, row } = this.indexToPos(i)
			this.cells[i] = callback.call(this, col, row)
		}
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