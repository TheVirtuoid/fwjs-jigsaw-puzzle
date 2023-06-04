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
			pieces: new Map()
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
		this.#puzzle.pieces.clear();
		pieces.forEach((piece) => {
			this.#puzzle.pieces.set(piece.id, piece);
		});
		this.#board.dom.addEventListener('mousedown', this.#startDropHandle);
		return pieces;
	}

	shuffle() {
		if (this.#puzzle.pieces.size === 0) {
			throw new SyntaxError(`'cut' must be called first.`);
		}
		this.#puzzle.pieces.forEach((piece, key) => {
			const x = Math.floor(Math.random() * (this.#board.width - piece.width));
			const y = Math.floor(Math.random() * (this.#board.height - piece.height));
			piece.dom.style.top = `${y}px`;
			piece.dom.style.left = `${x}px`;
		});
	}

	#startDrop(event) {
		const { target } = event;
		if (target instanceof HTMLCanvasElement) {
			const piece = this.#puzzle.pieces.get(target.parentElement.id);
			this.#pieceInMotion = piece;
			piece.dom.classList.add('dragging');
			document.addEventListener('mousemove', this.#doDragOverHandle);
			document.addEventListener('mouseup', this.#doDrop.bind(this), {once: true});
			piece.zIndex = this.#rollingZ;
			this.#rollingZ++;
		}
	}

	#doDragOver(event) {
		const piece = this.#pieceInMotion;
		const { movementX, movementY } = event;
		const { offsetLeft, offsetTop } = piece.dom;
		piece.dom.style.left = `${offsetLeft + movementX}px`;
		piece.dom.style.top = `${offsetTop + movementY}px`;
	}

	#doDrop(event) {
		const piece = this.#pieceInMotion;
		const { width: boardWidth, height: boardHeight } = this.#board;
		let left = Math.max(0, piece.dom.offsetLeft);
		let top = Math.max(0, piece.dom.offsetTop);
		left = Math.min(boardWidth - piece.dom.offsetWidth, left);
		top = Math.min(boardHeight - piece.dom.offsetHeight, top);
		piece.dom.style.left = `${left}px`;
		piece.dom.style.top = `${top}px`;
		piece.dom.classList.remove('dragging');
		document.removeEventListener('mousemove', this.#doDragOverHandle);
		this.#pieceInMotion = null;
		const matchedPieceInfo = this.#pattern.findFirstMatchedPiece(piece);
		if (matchedPieceInfo) {
			this.#pattern.mergePieces(piece, matchedPieceInfo);
			// piece.dispatchEvent(new CustomEvent('dropped'));
		}

	}
}
