export default class Puzzle {
	#pieces = new Map();
	constructor(args) {
		const { pieces = [] } =args;
		this.addPieces(pieces);
		Object.seal(this);
	}

	addPieces(pieces, errMsg = `"`) {
		if (!Array.isArray(pieces)) {
			throw new TypeError(`"pieces" argument is not an array of Piece instances.`);
		}
		pieces.forEach((piece) => {
			if (!(piece instanceof Piece)) {
				throw new TypeError(`"pieces" argument must be an array of Piece instances.`);
			}
			if (this.#pieces.has(piece)) {
				throw new RangeError(`"pieces"`)
			}
		});

	}
}