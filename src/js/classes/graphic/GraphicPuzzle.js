import Puzzle from "../Puzzle.js";
import Pattern from "../patterns/Pattern.js";

export default class GraphicPuzzle extends Puzzle {

	#board;
	#puzzle;
	#pattern;
	#anchorPoint;
	#startDropHandle;
	#doDragOverHandle;
	#pieceInMotion = null;
	#rollingZ = 1;

	constructor(args = {}) {
		super(args);
		const { width, height, anchorPoint } = args;
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
		// TODO: For some reason, getting this from Cypress produces a FALSE!!!
		// console.log(anchorPoint, anchorPoint instanceof HTMLDivElement, Object.getPrototypeOf(anchorPoint));
		// console.log(anchorPoint.parentElement);
		/*if (!(anchorPoint instanceof HTMLElement)) {
			throw new TypeError(`'anchorPoint' must be an HTMLElement.`);
		}*/
		if (!anchorPoint.parentElement) {
			throw new TypeError(`'anchorPoint' must be an HTMLElement.`);
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
		this.#board.dom.style.width = `${this.#board.width}px`;
		this.#board.dom.style.height = `${this.#board.height}px`;
		this.#anchorPoint = anchorPoint;
		while(this.#anchorPoint.firstChild) {
			this.#anchorPoint.removeChild(this.#anchorPoint.firstChild);
		}
		this.#anchorPoint.appendChild(this.#board.dom);
		this.#anchorPoint.style.width = `${this.#board.width}px`;
		this.#anchorPoint.style.height = `${this.#board.height}px`;
		this.#startDropHandle = this.#startDrop.bind(this);
		this.#doDragOverHandle = this.#doDragOver.bind(this);
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

	get pieceInMotion() {
		return this.#pieceInMotion || false;
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
		this.#board.dom.removeEventListener('mousedown', this.#startDropHandle);
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
		this.#board.dom.addEventListener('mousedown', this.#startDropHandle);
		return pieces;
	}

	shuffle() {
		if (this.#puzzle.pieces.length === 0) {
			throw new SyntaxError(`'cut' must be called first.`);
		}
		this.#puzzle.pieces.forEach((piece) => {
			const x = Math.floor(Math.random() * (this.#board.width - piece.dom.offsetWidth));
			const y = Math.floor(Math.random() * (this.#board.height - piece.dom.offsetHeight));
			piece.dom.style.top = `${y}px`;
			piece.dom.style.left = `${x}px`;
		});
	}

	#startDrop(event) {
		const { target } = event;
		if (target instanceof HTMLCanvasElement) {
			const piece = target.parentElement;
			this.#pieceInMotion = piece;
			piece.classList.add('dragging');
			document.addEventListener('mousemove', this.#doDragOverHandle);
			document.addEventListener('mouseup', this.#doDrop.bind(this), {once: true});
			piece.style.zIndex = `${this.#rollingZ}`;
			this.#rollingZ++;
		}
	}

	#doDragOver(event) {
		const piece = this.#pieceInMotion;
		const { movementX, movementY } = event;
		const { offsetLeft, offsetTop } = piece;
		piece.style.left = `${offsetLeft + movementX}px`;
		piece.style.top = `${offsetTop + movementY}px`;
	}

	#doDrop(event) {
		const piece = this.#pieceInMotion;
		const { width: boardWidth, height: boardHeight } = this.#board;
		let left = Math.max(0, piece.offsetLeft);
		let top = Math.max(0, piece.offsetTop);
		left = Math.min(boardWidth - piece.offsetWidth, left);
		top = Math.min(boardHeight - piece.offsetHeight, top);
		piece.style.left = `${left}px`;
		piece.style.top = `${top}px`;
		piece.classList.remove('dragging');
		document.removeEventListener('mousemove', this.#doDragOverHandle);
		this.#pieceInMotion = null;
		// piece.dispatchEvent(new CustomEvent('dropped'));
	}
}
