import Piece from "../Piece.js";

export default class GraphicPiece extends Piece {
	#width;
	#height;
	#image;
	#dom;
	#id;

	constructor(args = {}) {
		super(args);
		const { width, height, image, id } = args;
		if (!(image instanceof Image)) {
			throw new TypeError(`'image' argument must be type Image.`);
		}
		if(isNaN(height)) {
			throw new TypeError(`'height' argument must be a number.`);
		}
		if(height < 1) {
			throw new RangeError(`'height' argument must be greater than or equal to 1.`);
		}
		if(isNaN(width)) {
			throw new TypeError(`'width' argument must be a number.`);
		}
		if(width < 1) {
			throw new RangeError(`'width' argument must be greater than or equal to 1.`);
		}
		if(id === undefined) {
			throw new TypeError(`'id' must be defined.`);
		}
		this.#width = width;
		this.#height = height;
		this.#image = image;
		this.#id = id;
		// build
		const span = document.createElement('span');
		span.style.height = `${this.#height}px`;
		span.style.width = `${this.#width}px`;
		span.id = this.#id;
		const canvas = document.createElement('canvas');
		canvas.width = this.#width;
		canvas.height = this.#height;
		const context = canvas.getContext('2d');
		context.drawImage(this.#image, 0, 0);
		span.appendChild(canvas);
		this.#dom = span;
	}

	get width() {
		return this.#width;
	}

	get height() {
		return this.#height;
	}

	get image() {
		return this.#image;
	}

	get dom() {
		return this.#dom;
	}

	get id() {
		return this.#id;
	}
}