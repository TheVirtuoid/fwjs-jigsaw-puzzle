export default class Vertex {
	#id;

	constructor(args = {}) {
		const { id = '' } = args;
		this.#id = name;
		Object.seal(this);
	}

	get id() {
		return this.#id;
	}
}