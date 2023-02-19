import Vertex from "./Vertex.js";

export default class Piece {
	#vertices = [];

	constructor(args) {
		const { vertices } = args;
		if (!Array.isArray(vertices)) {
			throw new Error(`"Vertices" argument must be an array.`);
		}
		vertices.forEach((vertex) => {
			if (!(vertex instanceof Vertex)) {
				throw new Error(`"Vertices" argument must an array of Vertex instances.`);
			}
		})
		this.#vertices = vertices;
	}

	get vertices() {
		return this.#vertices;
	}
}