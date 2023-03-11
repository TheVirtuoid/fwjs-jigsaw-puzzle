import Puzzle from "../../src/js/classes/Puzzle.js";
import Piece from "../../src/js/classes/Piece.js";

describe('Puzzle:', () => {
	/*
			const puzzle = new Puzzle();
			const puzzle = new Puzzle({ pieces: [p1, p2, ..., pZ] });
	 */
	describe('creation: ', () => {
		it('should create an empty puzzle', () => {
			const puzzle = new Puzzle();
			expect(puzzle instanceof Puzzle).to.be.true;
		});
		it('should be immutable', () => {
			const puzzle = new Puzzle({ pieces: [] });
			try {
				puzzle.pieces = 'badone';
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('TypeError');
			}
			try {
				puzzle.property = 'badone';
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if pieces argument is not an array of Piece', () => {
			try {
				new Puzzle({ pieces: 'badone' });
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if there are duplicate pieces (same id) in pieces argument', () => {
			const piece1 = new Piece();
			try {
				new Puzzle({ pieces: [piece1, piece1] });
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('should report correct number of pieces', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1, piece2]});
			expect(puzzle.pieceCount).to.equal(2);
		});
	});
	/*
			const closesPieces = puzzle.getClosestPieces(piece)

			This routine, by some magic, will determine what pieces are closest to another piece
	 */
	describe('getClosestPieces: ', () => {
		it('should throw error is argument is not a Piece', () => {
			const piece = new Piece();
			const puzzle = new Puzzle({ pieces: [piece] });
			try {
				puzzle.getClosestPieces('badone');
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should return false if Piece is not in the Puzzle collection', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1]});
			const closestPieces = puzzle.getClosestPieces(piece2);
			expect(closestPieces).to.be.false;
		});
		it('should return the closest pieces', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const piece3 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1, piece2, piece3]});
			const closestPieces = puzzle.getClosestPieces(piece2);
			expect(closestPieces.length).to.equal(2);
			console.log(closestPieces);
			expect(closestPieces.find((piece) => piece === piece1)).not.to.be.undefined;
			expect(closestPieces.find((piece) => piece === piece3)).not.to.be.undefined;
		});
	});

	/*
			puzzle.addPiece(piece)
	 */
	describe('addPiece: ', () => {
		it('should throw error if piece is not a piece', () => {
			const puzzle = new Puzzle();
			try {
				puzzle.addPiece('badone');
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if piece is already in collection', () => {
			const piece = new Piece();
			const puzzle = new Puzzle({ pieces: [piece] });
			try {
				puzzle.addPiece(piece);
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('should add the piece to the collection', () => {
			const piece = new Piece();
			const puzzle = new Puzzle();
			puzzle.addPiece(piece);
			expect(puzzle.pieceCount).to.equal(1);
		});
		it('should return the puzzle', () => {
			const piece = new Piece();
			const puzzle = new Puzzle();
			const newPuzzle = puzzle.addPiece(piece);
			expect(newPuzzle === puzzle).to.be.true;
		});
	});

	/*
			puzzle.addPieces([p1, p2, ..., pZ]);
	 */
	describe('addPieces: ', () => {
		it('should throw error if argument is not an array of Pieces', () => {
			const puzzle = new Puzzle();
			try {
				puzzle.addPieces('badone');
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error is AT LEAST ONE piece is already in the collection', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const piece3 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1] });
			try {
				puzzle.addPieces([piece2, piece3, piece1]);
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('give at least one piece is already in collection, should not add ANY addition piece', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const piece3 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1] });
			try {
				puzzle.addPieces([piece2, piece3, piece1]);
				expect(true).to.be.false;
			} catch(err) {
				expect(puzzle.pieceCount).to.equal(1);
			}
		});
		it('should add all the pieces', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const piece3 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1] });
			puzzle.addPieces([piece2, piece3]);
			expect(puzzle.pieceCount).to.equal(3);
		});
		it('should return puzzle', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const piece3 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1] });
			const newPuzzle = puzzle.addPieces([piece2, piece3]);
			expect(newPuzzle === puzzle).to.be.true;
		});
	});

	/*
			puzzle.removePiece(piece)
	 */
	describe('removePiece: ', () => {
		it('should throw error if argument is not a Piece', () => {
			const piece1 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1] });
			try {
				puzzle.removePiece('badone');
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if Piece is not in the collection', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1] });
			try {
				puzzle.removePiece(piece2);
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('should remove the piece', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1, piece2] });
			puzzle.removePiece(piece2);
			expect(puzzle.pieceCount).to.equal(1);
		});
		it('should return puzzle', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1, piece2] });
			const newPuzzle = puzzle.removePiece(piece2);
			expect(newPuzzle === puzzle).to.be.true;
		});
	});

	/*
			puzzle.removePieces([p1, p2, ..., pZ])
	 */
	describe('removePieces: ', () => {
		it('should throw error if argument is not an array of Pieces', () => {
			const puzzle = new Puzzle();
			try {
				puzzle.removePieces('badone');
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if at least one instance is not in the collection', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const piece3 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1] });
			try {
				puzzle.removePieces([piece1, piece2, piece3]);
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('give at least one Piece is not in collection, should not remove ANY piece', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const piece3 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1] });
			try {
				puzzle.removePieces([piece1, piece2, piece3]);
				expect(true).to.be.false;
			} catch(err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('should remove the pieces', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const piece3 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1, piece2, piece3] });
			puzzle.removePieces([piece1, piece2]);
			expect(puzzle.pieceCount).to.equal(1);
		});
		it('should return puzzle', () => {
			const piece1 = new Piece();
			const piece2 = new Piece();
			const piece3 = new Piece();
			const puzzle = new Puzzle({ pieces: [piece1, piece2, piece3] });
			const newPuzzle = puzzle.removePieces([piece1, piece2]);
			expect(newPuzzle === puzzle).to.be.true;
		});
	});
});