export default class GraphicImage {

	#dom;
	#vertices;
	#parent;

	constructor( args = {}) {
		const { width, height, vertices, parent } = args;
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		this.#dom = canvas;
		this.#parent = parent;
		this.#vertices = vertices;
	}

	get dom() {
		return this.#dom;
	}

	get top() {
		return this.#dom.offsetTop;
	}

	get left() {
		return this.#dom.offsetLeft;
	}

	setImage(image, xOffset, yOffset) {
		const context = this.#dom.getContext('2d');
		const { width, height } = this.#dom;
		context.drawImage(image, xOffset, yOffset, width, height, 0, 0, width, height);
	}

	get vertices() {
		return this.#vertices;
	}

	setPosition(top, left) {
		this.#dom.style.top = `${top}px`;
		this.#dom.style.left = `${left}px`;
	}

	adjustImage(x, y) {
		const { offsetTop, offsetLeft } = this.#dom;
		this.#dom.style.top = `${offsetTop + y}px`;
		this.#dom.style.left = `${offsetLeft + x}px`;
	}

	getVertexInfo(vertexId) {
		const vertexInfo = [...this.#vertices.values()].find((vertexInfo) => {
			return vertexInfo.vertexId == vertexId;
		});
		return vertexInfo ?
				{ vertexId, top: vertexInfo.top + this.#dom.offsetTop, left: vertexInfo.left + this.#dom.offsetLeft } :
				vertexInfo;
	}
}