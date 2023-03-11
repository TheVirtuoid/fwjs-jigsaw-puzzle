import Piece from "./Piece.js";

export default class Puzzle {
	#pieces = new Map();
	constructor(args = {}) {
		const { pieces = [] } =args;
		this.addPieces(pieces);
		Object.seal(this);
	}

	get pieceCount() {
		return this.#pieces.size;
	}

	addPiece(piece) {
		return this.addPieces([piece], `"piece" argument must be a Piece instance.`);
	}

	addPieces(pieces, errMsg = `"pieces" argument must be made up of Piece instances.`) {
		if (!Array.isArray(pieces)) {
			throw new TypeError(`"pieces" argument is not an array of Piece instances.`);
		}
		pieces.forEach((piece, index) => {
			if (!(piece instanceof Piece)) {
				throw new TypeError(errMsg);
			}
			if (this.#pieces.has(piece)) {
				throw new RangeError(`"pieces" argument must not already be in the Pieces collection.`);
			}
			if (pieces.indexOf(piece) !== index) {
				throw new RangeError(`Duplicate pieces found in pieces argument.`);
			}
		});
		pieces.forEach((piece) => {
			this.#pieces.set(piece, {});
		});
		return this;
	}

	removePiece(piece) {
		return this.removePieces([piece], `"piece" argument must be an instance of Piece.`)
	}

	removePieces(pieces, errMsg = `"pieces" argument must be an array of Piece instances.`) {
		if (!Array.isArray(pieces)) {
			throw new TypeError(`"pieces" argument is not an array of Piece instances.`);
		}
		pieces.forEach((piece, index) => {
			if (!(piece instanceof Piece)) {
				throw new TypeError(errMsg);
			}
			if (!this.#pieces.has(piece)) {
				throw new RangeError(`"pieces" argument must already exist in Pieces collection.`);
			}
			if (pieces.indexOf(piece) !== index) {
				throw new RangeError(`Duplicate pieces found in pieces argument.`);
			}
		});
		pieces.forEach((piece) => {
			this.#pieces.delete(piece);
		});
		return this;
	}

	getClosestPieces(piece) {
		if (!(piece instanceof Piece)) {
			throw new TypeError(`"pieces" argument must be an array of Piece instances.`);
		}
		if (!this.#pieces.has(piece)) {
			return false;
		}
		// TODO: This is where we need a routine to get the closest pieces once the graphics are implemented.
		//				What we will do for now is to simply return an array without the mentioned piece.
		return [...this.#pieces.keys()].filter((inPuzzlePiece) => inPuzzlePiece !== piece);
	}
}