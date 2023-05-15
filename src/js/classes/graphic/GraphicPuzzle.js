import Puzzle from "../Puzzle.js";
import Pattern from "../patterns/Pattern.js";

export default class GraphicPuzzle extends Puzzle {

	#board;
	#puzzle;
	#pattern;

	constructor(args = {}) {
		super(args);
		const { width, height } = args;
		if (isNaN(width)) {
			throw new TypeError(`'width' argument must be a number.`);
		}
		if (isNaN(height)) {
			throw new TypeError(`'height' argument must be a number.`);
		}
		if (width < 1) {
			throw new RangeError(`'width' argument must be 1 or greater`);
		}
		if (height < 1) {
			throw new RangeError(`'height' argument must be 1 or greater`);
		}

		// build;
		this.#board = {
			width: width,
			height: height,
			dom: document.createElement('section')
		}
		this.#puzzle = {
			width: undefined,
			height: undefined,
			image: undefined,
			pieces: []
		}
		this.#board.dom.id = 'cut';
	}

	get board() {
		return this.#board;
	}

	get pattern() {
		return this.#pattern;
	}

	get puzzle() {
		return this.#puzzle;
	}

	setImage(args = {}) {
		let { image, height, width } = args;
		if (!(image instanceof Image)) {
			throw new TypeError(`'image' argument must be type Image.`);
		}
		this.#puzzle.image = image;
		height = height ?? image.height;
		width = width ?? image.width;
		if (isNaN(height)) {
			throw new TypeError(`'height' argument must be a number.`);
		}
		if (height < 1) {
			throw new RangeError(`'height' argument must be 1 or greater.`);
		}
		if (isNaN(width)) {
			throw new TypeError(`'width' argument must be a number.`);
		}
		if (width < 1) {
			throw new RangeError(`'width' argument must be 1 or greater.`);
		}
		this.puzzle.height = height;
		this.puzzle.width = width;
	}

	setPattern(pattern) {
		if (!(pattern instanceof Pattern)) {
			throw new TypeError(`'pattern' argument must be a type Pattern.`);
		}
		this.#pattern = pattern;
	}

	cut() {
		if (!this.#pattern) {
			throw new SyntaxError(`'setPattern()' must first be called.`);
		}
		if (!this.#puzzle.image) {
			throw new SyntaxError(`'setImage()' must first be called.`);
		}
		const pieces = this.#pattern.cut({
			image: this.#puzzle.image,
			puzzleWidth: this.#puzzle.width,
			puzzleHeight: this.#puzzle.height
		});
		while(this.#board.dom.firstChild) {
			this.#board.dom.removeChild(this.#board.dom.firstChild);
		}
		pieces.forEach((piece) => {
			this.#board.dom.appendChild(piece.dom);
		});
		this.#puzzle.pieces = pieces;
		return pieces;
	}

	shuffle() {
		if (this.#puzzle.pieces.length === 0) {
			throw new SyntaxError(`'cut' must be called first.`);
		}
		this.#puzzle.pieces.forEach((piece) => {
			const x = Math.floor(Math.random() * (this.#board.width - piece.dom.offsetWidth));
			const y = Math.floor(Math.random() * (this.#board.height - piece.dom.offsetHeight));
			piece.style.top = `${y}px`;
			piece.style.left = `${x}px`;
		});
	}

}
