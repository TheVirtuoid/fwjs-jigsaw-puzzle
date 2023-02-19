export default class Vertex {
	#x;
	#y;
	#z;
	#name;

	constructor(args = {}) {
		const { x = 0, y = 0, z = 0, name = '' } = args;
		this.#x = x;
		this.#y = y;
		this.#z = z;
		this.#name = name;
	}

	get location() {
		return {
			x: this.#x,
			y: this.#y,
			z: this.#z
		};
	}

	get name() {
		return this.#name;
	}
}