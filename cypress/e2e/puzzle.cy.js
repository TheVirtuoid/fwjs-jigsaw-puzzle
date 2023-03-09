describe('Puzzle:', () => {
	/*
			const puzzle = new Puzzle();
			const puzzle = new Puzzle({ pieces: [p1, p2, ..., pZ] });
	 */
	describe('creation: ', () => {
		it('should create an empty puzzle', () => {});
		it('should be immutable', () => {});
		it('should throw error if pieces argument is not an array of Piece', () => {});
		it('should throw error if there are duplicate pieces (same id) in pieces argument', () => {});
		it('should report correct number of pieces', () => {});
		it('should return Puzzle', () => {});
	});

	/*
			puzzle.getPieceById(id)
	 */
	describe('getPieceById: ', () => {
		it('should throw error if id is not specified', () => {});
		it('should throw error if piece cannot be found', () => {});
		it('should return piece', () => {});
	});

	/*
			const closesPieces = puzzle.getClosestPieces(piece)

			This routine, by some magic, will determine what pieces are closest to another piece
	 */
	describe('getClosestPieces: ', () => {
		it('should throw error is argument is not a Piece', () => {});
		it('should throw error is Piece is not in the Puzzle collection', () => {});
		it('should return the closest pieces', () => {});
	});

	/*
			puzzle.addPiece(piece)
	 */
	describe('addPiece: ', () => {
		it('should throw error if piece is not a piece', () => {});
		it('should throw error if piece is already in collection', () => {});
		it('should add the piece to the collection', () => {});
		it('should return the puzzle', () => {});
	});

	/*
			puzzle.addPieces([p1, p2, ..., pZ]);
	 */
	describe('addPieces: ', () => {
		it('should throw error if argument is not an array of Pieces', () => {});
		it('should throw error is AT LEAST ONE piece is already in the collection', () => {});
		it('give at least one piece is already in collection, should not add ANY addition piece', () => {});
		it('should add all the pieces', () => {});
		it('should return puzzle', () => {});
	});

	/*
			puzzle.removePiece(piece)
	 */
	describe('removePiece: ', () => {
		it('should throw error if argument is not a Piece', () => {});
		it('should throw error if Piece is not in the collection', () => {});
		it('should remove the piece', () => {});
		it('should return puzzle', () => {});
	});

	/*
			puzzle.removePieces([p1, p2, ..., pZ])
	 */
	describe('removePieces: ', () => {
		it('should throw error if argument is not an array of Pieces', () => {});
		it('should throw error if at least one instance is not in the collection', () => {});
		it('give at least one Piece is not in collection, should not remove ANY piece', () => {});
		it('should remove the pieces', () => {});
		it('should return puzzle', () => {});
	});
});