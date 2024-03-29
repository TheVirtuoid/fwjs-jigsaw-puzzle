import Vertex from "./Vertex.js";

export default class Piece {
	#vertices = new Map();

	constructor(args = {}) {
		const { vertices = [] } = args;
		this.addVertices(vertices);
		Object.seal(this);
	}

	get vertexCount() {
		return this.#vertices.size;
	}

	addVertex(vertex) {
		return this.addVertices([vertex], `"Vertex" argument must be a Vertex instance.`);
	}

	addVertices(vertices, errMsg = `"Vertices" argument must an array of Vertex instances.`) {
		if (!Array.isArray(vertices)) {
			throw new TypeError(`"Vertices" argument must be an array.`);
		}
		vertices.forEach((vertex, index) => {
			if (!(vertex instanceof Vertex)) {
				throw new TypeError(errMsg);
			}
			if (this.#vertices.has(vertex)) {
				throw new RangeError(`"Vertex" argument already exist in this piece.`);
			}
			if (vertices.indexOf(vertex) !== index) {
				throw new RangeError(`Duplicate vertices found in vertices argument.`);
			}
		});
		vertices.forEach((vertex) => this.#vertices.set(vertex, {}));
		return this;
	}

	removeVertex(vertex) {
		return this.removeVertices([vertex], `"Vertex" argument must be a Vertex instance.`);
	}

	removeVertices(vertices, errMsg = `"Vertices" argument must an array of Vertex instances.`) {
		if (!Array.isArray(vertices)) {
			throw new TypeError(`"Vertices" argument must be an array.`);
		}
		vertices.forEach((vertex, index) => {
			if (!(vertex instanceof Vertex)) {
				throw new TypeError(errMsg);
			}
			if (!this.#vertices.has(vertex)) {
				throw new RangeError(`"Vertex" argument must exist in this piece.`);
			}
			if (vertices.indexOf(vertex) !== index) {
				throw new RangeError(`Duplicate vertices found in vertices argument.`);
			}
		});
		vertices.forEach((vertex) => this.#vertices.delete(vertex));
		return this;
	}

	clearVertices() {
		const vertices = [...this.#vertices.keys()];
		this.removeVertices(vertices);
		return vertices;
	}

	isConnectedTo(piece) {
		if (!(piece instanceof Piece)) {
			throw new TypeError(`"piece" argument must be an instance of Piece.`);
		}
		const connectedPieces = [...this.#vertices.keys()].filter((vertex) => piece.isVertexPresent(vertex));
		return connectedPieces.length ? connectedPieces : false;
	}

	merge(piece) {
		if (!(piece instanceof Piece)) {
			throw new TypeError(`"piece" argument must be an instance of Piece.`);
		}
		const newPiece = new Piece();
		const thisPieceVertices = this.clearVertices();
		const otherPieceVertices = piece.clearVertices();
		const mergedVertices = [...thisPieceVertices, ...otherPieceVertices].filter((vertex, index, vertices) => {
			return vertices.indexOf(vertex) === index;
		});
		newPiece.addVertices(mergedVertices);
		return newPiece;
	}

	isVertexPresent(vertex) {
		if (!(vertex instanceof Vertex)) {
			throw new TypeError(`"vertex" argument must be an instance of Vertex.`);
		}
		return this.#vertices.has(vertex);
	}

}