import Vertex from "../Vertex.js";

export default class GraphicVertex extends Vertex {

	#x;
	#y;
	#id
	constructor(args) {
		super(args);
		const { x, y, id } = args;
		this.#x = x;
		this.#y = y;
		this.#id = id;
	}

	get id () {
		return this.#id;
	}

	get x () {
		return this.#x;
	}

	get y () {
		return this.#y;
	}
}