import GraphicPiece from "../graphic/GraphicPiece.js";
import Pattern from "./Pattern.js";

export default class Cut16Square extends Pattern {
	static #pieces = 16;
	static #cut = 'square'

	constructor(args = {}) {
		super();
	}

	get numPieces() {
		return Cut16Square.#pieces;
	}

	get cutType() {
		return Cut16Square.#cut;
	}

	cut (args = {}) {
		const { image, puzzleWidth, puzzleHeight } = args;
		if (!(image instanceof Image)) {
			throw new TypeError(`'image' argument must be a type 'Image'`);
		}
		if(isNaN(puzzleWidth)) {
			throw new TypeError(`'puzzleWidth' argument must be a number`);
		}
		if (isNaN(puzzleHeight)) {
			throw new TypeError(`'puzzleHeight' argument must be a number`);
		}
		if (puzzleWidth < 1) {
			throw new RangeError(`'puzzleWidth' must be greater than or equal to 0`);
		}
		if (puzzleHeight < 1) {
			throw new RangeError(`'puzzleHeight' must be greater than or equal to 0`);
		}
		const pieces = [];

		const rows = this.numPieces / 4;
		const cols = this.numPieces / 4;
		const pieceHeight = puzzleHeight / cols;
		const pieceWidth = puzzleWidth / rows;
		for(let r = 0; r < rows; r++) {
			for(let c = 0; c < cols; c++) {
				const id = `${r}-${c}`;
				const canvas = document.createElement('canvas');
				canvas.width = pieceWidth;
				canvas.height = pieceHeight;
				const context = canvas.getContext('2d');
				context.drawImage(image, c * pieceWidth, r * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
				const pieceImage = new Image();
				pieceImage.src = canvas.toDataURL();
				const piece = new GraphicPiece({ image: pieceImage, width: pieceWidth, height: pieceHeight, id });
				pieces.push(piece);
			}
		}
		return pieces;
	}
}

