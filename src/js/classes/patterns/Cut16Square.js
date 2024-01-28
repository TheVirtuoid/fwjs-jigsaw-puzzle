import GraphicPiece from "../graphic/GraphicPiece.js";
import Pattern from "./Pattern.js";
import GraphicVertex from "../graphic/GraphicVertex.js";
import Vertex from "../Vertex.js";

export default class Cut16Square extends Pattern {
	static #pieces = 16;
	static #cut = 'square'

	#vertices = new Map();
	#vertexIds = new Map();

	constructor(args = {}) {
		super();
	}

	get numPieces() {
		return Cut16Square.#pieces;
	}

	get cutType() {
		return Cut16Square.#cut;
	}

	get vertices() {
		return this.#vertices;
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
		const rows = this.numPieces / 4;
		const cols = this.numPieces / 4;
		// create the vertices
		for (let i = 0; i < (rows + 1) * (cols + 1); i++) {
			this.#vertices.set(i, { vertex: new Vertex(), pieces: [] });
		}
		const pieces = [];
		const piecesMap = new Map();

		const pieceHeight = puzzleHeight / cols;
		const pieceWidth = puzzleWidth / rows;
		for(let row = 0; row < rows; row++) {
			for(let col = 0; col < cols; col++) {
				const id = `${row}-${col}`;
				const canvas = document.createElement('canvas');
				canvas.width = pieceWidth;
				canvas.height = pieceHeight;
				const context = canvas.getContext('2d');
				context.drawImage(image, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
				const vertices = [];
				vertices.push(
						{ vertexId: row * (rows + 1) + col, top: 0, left: 0, relativeTop: 0, relativeLeft: 0 },
						{ vertexId: row * (rows + 1) + col + 1, top: 0, left: pieceWidth - 1, relativeTop: 0, relativeLeft: 1 },
						{ vertexId: (row + 1) * (rows + 1) + col, top: pieceHeight - 1, left: 0, relativeTop: 1, relativeLeft: 0 },
						{ vertexId: (row + 1) * (rows + 1) + col + 1, top: pieceHeight - 1, left: pieceWidth - 1, relativeTop: 1, relativeLeft: 1 }
				);
				const piece = new GraphicPiece({ image: canvas, width: pieceWidth, height: pieceHeight, id, vertices });
				vertices.forEach((vertexInfo) => {
					const { vertexId } = vertexInfo;
					const vertexData = this.#vertices.get(vertexId);
					vertexData.pieces.push(piece);
					this.#vertices.set(vertexId, vertexData);
				});
				pieces.push(piece);
			}
		}
		return pieces;
	}

	#addVertex(row, col, position) {
		const id = this.#setVertexId(row, col, position);
		const vertex = new GraphicVertex({ id });
		this.#vertices.set(id, { vertex, pieces: [] });
		return vertex;
	}

	#setVertexId(row, col, position) {
		return `${row}-${col}-${position}`;
	}

	#getId(row, col) {
		return `${row}-${col}`;
}

	#addVerticesToMap(vertices) {

	}

	findMatchingPieces(piece) {
		const matches = {
			firstMatchingPiece: null,
			relativeShifts: {
				top: 0,
				left: 0
			}
		};
		piece.vertices.forEach(({ vertexId }) => {
			const placedPieceInfo = piece.getVertexInfo(vertexId);
			const { pieces } = this.#vertices.get(vertexId);
			pieces.forEach((destinationPiece) => {
				if (destinationPiece !== piece) {
					const vertexInfo = destinationPiece.getVertexInfo(vertexId);
					const onDiagonal = (Math.abs(vertexInfo.relativeLeft - placedPieceInfo.relativeLeft) +
							Math.abs(vertexInfo.relativeTop - placedPieceInfo.relativeTop)) === 2;
					if (Math.abs(vertexInfo.left - placedPieceInfo.left) <= 3 && Math.abs(vertexInfo.top - placedPieceInfo.top) <=3 && !onDiagonal ) {
						matches.firstMatchingPiece = matches.firstMatchingPiece ?? { matchedPiece: destinationPiece, vertexId: vertexId };
						// console.log(vertexInfo, placedPieceInfo);
					}
				}
			});
		});
		return matches;
	}

	mergePieces(piece, matchedPieceInfo) {
		const { matchedPiece, vertexId } = matchedPieceInfo;
		const vertexInfo = piece.getVertexInfo(vertexId);
		const matchedVertexInfo = matchedPiece.getVertexInfo(vertexId);
		piece.adjustPosition({ top: vertexInfo.top - matchedVertexInfo.top, left: vertexInfo.left - matchedVertexInfo.left });

		// determine the new position of the matchedPiece
		let newTop = Math.min(matchedPiece.top, piece.top);
		let newLeft = Math.min(matchedPiece.left, piece.left);

		// determine the difference between the old piece positions and the new positions
		const pieceDiffTop = piece.top - newTop;
		const pieceDiffLeft = piece.left - newLeft;
		const matchedDiffTop = matchedPiece.top - newTop;
		const matchedDiffLeft = matchedPiece.left - newLeft;

		// go through each graphicImage and make the style adjustment
		piece.graphicImages.forEach((graphicImage) => {
			graphicImage.setPosition(graphicImage.top + pieceDiffTop, graphicImage.left + pieceDiffLeft)
		});
		matchedPiece.graphicImages.forEach((graphicImage) => {
			graphicImage.setPosition(graphicImage.top + matchedDiffTop, graphicImage.left + matchedDiffLeft)
		});

		// merge the graphic pieces
		piece.graphicImages.forEach((graphicImage) => {
			matchedPiece.dom.appendChild(graphicImage.dom);
			matchedPiece.graphicImages.add(graphicImage);
		});

		// set the new piece position
		matchedPiece.setPosition(newTop, newLeft);
		matchedPiece.zIndex = piece.zIndex;

		// remove the old piece from the vertices list
		piece.vertices.forEach((vertexInfo) => {
			const { vertexId } = vertexInfo;
			const vertexPieces = this.#vertices.get(vertexId);
			let { vertex, pieces } = vertexPieces;
			let newPieces = pieces.filter((testedPiece) => piece !== testedPiece).concat(matchedPiece);
			newPieces = [...new Set(newPieces)];
			this.#vertices.set(vertexId, { vertex, pieces: newPieces });
		});


	}
}

