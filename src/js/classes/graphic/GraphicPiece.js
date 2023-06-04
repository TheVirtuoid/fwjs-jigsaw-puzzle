import Piece from "../Piece.js";
import GraphicImage from "./GraphicImage.js";

export default class GraphicPiece extends Piece {
	#width;
	#height;
	#image;
	#dom;
	#id;
	#graphicImages = new Set();
	#zIndex;
	#parent;

	constructor(args = {}) {
		super({...args, vertices: [] });
		const { width, height, image, id, vertices } = args;
		if (!(image instanceof Image) && !(image instanceof HTMLCanvasElement)) {
			throw new TypeError(`'image' argument must be type Image or HTMLCanvasElement.`);
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
		this.#zIndex = 0;
		// build
		const span = document.createElement('span');
		/*span.style.height = `${this.#height}px`;
		span.style.width = `${this.#width}px`;*/
		span.id = this.#id;

		const graphicImage = new GraphicImage({ width, height, vertices, parent: this });
		graphicImage.setImage(image, 0, 0);

		span.appendChild(graphicImage.dom);
		this.#dom = span;
		this.#graphicImages.add(graphicImage);
	}

	get width() {
		const left = [...this.#graphicImages.values()].reduce((currentLeft, graphicImage) => {
			return Math.max(currentLeft, graphicImage.dom.offsetLeft);
		}, 0);
		return left + this.#width;
	}

	get height() {
		const top = [...this.#graphicImages.values()].reduce((currentTop, graphicImage) => {
			return Math.max(currentTop, graphicImage.dom.offsetTop);
		}, 0);
		return top + this.#height;
	}

	get image() {
		return this.#image;
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

	get id() {
		return this.#id;
	}

	get graphicImages() {
		return this.#graphicImages;
	}

	get vertices() {
		let vertices = [];
		const a = [...this.#graphicImages.values()].map((graphicImage) => {
			vertices = vertices.concat(graphicImage.vertices);
		});
		return vertices;
	}

	get zIndex() {
		return this.#zIndex;
	}

	set zIndex(zIndex) {
		this.#zIndex = zIndex;
		this.#dom.style.zIndex = `${this.#zIndex}`;
	}

	setPosition(top, left) {
		this.#dom.style.top = `${top}px`;
		this.#dom.style.left = `${left}px`;
	}

	getVertexInfo(vertexId) {
		const graphicImage = [...this.#graphicImages.values()].find((graphicImage) => {
			const vertexInfo = graphicImage.getVertexInfo(vertexId);
			return !!vertexInfo;
		});
		const vertexInfo = graphicImage ? graphicImage.getVertexInfo(vertexId) : vertexInfo;
		return vertexInfo ?
				{ vertexId, top: vertexInfo.top + this.#dom.offsetTop, left: vertexInfo.left + this.#dom.offsetLeft } :
				vertexInfo;
	}

	adjustPosition(args = {}) {
		const { top = 0, left = 0 } = args;
		this.#dom.style.top = `${this.#dom.offsetTop - top}px`;
		this.#dom.style.left = `${this.#dom.offsetLeft - left}px`;
	}
}