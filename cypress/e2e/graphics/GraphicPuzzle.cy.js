describe('GraphicPuzzle', () => {
	it('should initialize the board', () => {});
	it('should load the image', () => {});
	it('should retrieve the piece/cut pattern', () => {});
	it('should cut out the pieces', () => {});
	it('should shuffle the pieces', () => {});

	describe('start drag', () => {
		it('should not start drag operation if mousedown not on a piece', () => {});
		it('should start drag operation when mousedown on a piece', () => {});
		it('should insure the piece being dragged has the largest z-index', () => {});
		it('should insure the piece being dragged has the "dragging" class', () => {});
	});

	describe('drag/drop movement', () => {
		it('should move the piece and drop inside the board', () => {});
		it('should move piece to X=0 if any part of the piece moves off the left side of the board', () => {});
		it('should move piece to Y=0 if any part of the piece moves off the top side of the board', () => {});
		it('should move piece to X=boardWidth-pieceWidth if any part of the piece moves off the right side of the board', () => {});
		it('should move piece to Y=boardHeight-pieceHeight if any part of the piece moves off the bottom side of the board', () => {});
	});
});