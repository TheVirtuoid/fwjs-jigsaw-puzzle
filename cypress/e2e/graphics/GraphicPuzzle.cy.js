import GraphicPuzzle from "../../../src/js/classes/graphic/GraphicPuzzle.js";
import { imageUrl, params } from "../../fixtures/graphicData.js";
import Cut16Square from "../../../src/js/classes/patterns/Cut16Sqaure.js";

let puzzle;
let image;
const { boardWidth, boardHeight, numPieces, pieceWidth, pieceHeight, puzzleWidth, puzzleHeight } = params;

before( () => {
	cy.visit('http://localhost:5173/index.html');
	image = new Image();
	image.src = imageUrl;
});

describe('constructor', () => {
	it('should throw error is height is not a number', () => {
		try {
			new GraphicPuzzle({ width: boardWidth, height: 'badone' });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw error is width is not a number', () => {
		try {
			new GraphicPuzzle({ width: 'badone', height: boardHeight });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw error is height is less than 1', () => {
		try {
			new GraphicPuzzle({ width: boardWidth, height: 0 });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should throw error is width is less than 1', () => {
		try {
			new GraphicPuzzle({ width: 0, height: boardHeight });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should create the puzzle', () => {
		const newPuzzle = new GraphicPuzzle({ width: boardWidth, height: boardHeight });
		expect(newPuzzle instanceof GraphicPuzzle).to.be.true;
	});
});

describe('setImage', () => {
	beforeEach(() => {
		puzzle = new GraphicPuzzle({ height: boardHeight, width: boardWidth });
	});
	it('should set width/height defaults', () => {
		puzzle.setImage({ image });
		expect(puzzle.puzzle.width).to.equal(image.width);
		expect(puzzle.puzzle.height).to.equal(image.height);
	});
	describe('setting image', () => {
		it('should throw error if image is not type Image', () => {
			try {
				puzzle.setImage({ image: 'badone' });
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should load the image', () => {
			puzzle.setImage({ image });
			expect(puzzle.puzzle.image).not.to.be.undefined;
		});
	});
	describe('setting width', () => {
		it('should throw error if width is not a number', () => {
			try {
				puzzle.setImage({ image, width: 'badone' })
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if width < 1', () => {
			try {
				puzzle.setImage({ image, width: 0 })
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('should set the width', () => {
			puzzle.setImage({ image, width: puzzleWidth });
			expect(puzzle.puzzle.width).to.equal(puzzleWidth);
		});
	});
	describe('setting height', () => {
		it('should throw error if height is not a number', () => {
			try {
				puzzle.setImage({ image, height: 'badone' })
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if height < 1', () => {
			try {
				puzzle.setImage({ image, height: 0 })
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('should set the height', () => {
			puzzle.setImage({ image, height: puzzleHeight });
			expect(puzzle.puzzle.height).to.equal(puzzleHeight);
		});
	});
});

describe('setPattern', () => {
	beforeEach(() => {
		puzzle = new GraphicPuzzle({ height: boardHeight, width: boardWidth });
	});
	it('should retrieve the piece/cut pattern', () => {
		puzzle.setPattern(new Cut16Square());
		expect(puzzle.pattern instanceof Cut16Square).to.be.true;
	});
	it('should throw error if pattern is not type Pattern', () => {
		try {
			puzzle.setPattern('badone');
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});

describe('cut', () => {
	beforeEach(() => {
		puzzle = new GraphicPuzzle({ height: boardHeight, width: boardWidth });
	});
	it('should throw error if setImage was not called', () => {
		try {
			puzzle.setPattern(new Cut16Square());
			puzzle.cut();
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('SyntaxError');
		}
	});
	it('should throw error if setPattern was not called', () => {
		try {
			puzzle.setImage({ image });
			puzzle.cut();
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('SyntaxError');
		}
	});
	it('should cut out the pieces', () => {
		const cut = new Cut16Square();
		puzzle.setImage({ image, width: puzzleWidth, height: puzzleHeight });
		puzzle.setPattern(new Cut16Square());
		const pieces = puzzle.cut();
		expect(pieces.length).to.equal(cut.numPieces);
		expect(puzzle.puzzle.pieces.length).to.equal(cut.numPieces);
	});
});

describe('shuffle', () => {
	it('should throw error is cut has not been called', () => {
		puzzle.setImage({ image, width: puzzleWidth, height: puzzleHeight });
		puzzle.setPattern(new Cut16Square());
		try {
			puzzle.shuffle();
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('SyntaxError');
		}
	});
	it('should shuffle!', () => {
		puzzle.setImage({ image, width: puzzleWidth, height: puzzleHeight });
		puzzle.setPattern(new Cut16Square());
		puzzle.cut();
		puzzle.shuffle();
		// we really only need to check maybe three of them
		expect(puzzle.puzzle.pieces[0].dom.offsetLeft).not.equal(0);
		expect(puzzle.puzzle.pieces[1].dom.offsetLeft).not.equal(pieceWidth);
		expect(puzzle.puzzle.pieces[2].dom.offsetLeft).not.equal(pieceWidth * 2);
	});
});

describe('GraphicPuzzle', () => {
	beforeEach(() => {
		puzzle = new GraphicPuzzle({ height: boardHeight, width: boardWidth });
	});

	it('should initialize the board', () => {
		expect(puzzle.board).not.to.be.undefined;
		expect(puzzle.board.height).to.equal(boardHeight);
		expect(puzzle.board.width).to.equal(boardWidth);
	});

	it('should shuffle the pieces', () => {
		puzzle.setImage(image);
		puzzle.setPattern(new Cut16Square());
		puzzle.cut();
		puzzle.shuffle();
		// we really only need to check maybe three of them
		expect(puzzle.pieces[0].dom.offsetLeft).not.equal(0);
		expect(puzzle.pieces[1].dom.offsetLeft).not.equal(pieceWidth);
		expect(puzzle.pieces[2].dom.offsetLeft).not.equal(pieceWidth * 2);
	});

	describe('start drag', () => {
		beforeEach( () => {
			puzzle.setImage(image);
			puzzle.setPattern(new Cut16Square());
			puzzle.cut();
			puzzle.shuffle();
		});
		it('should not start drag operation if mousedown not on a piece', () => {
			cy.document()
					.then((document) => {
						const bx = puzzle.board.dom.offsetLeft;
						const by = puzzle.board.dom.offsetTop;
						cy.wrap(document).trigger('mousedown', { x: bx, y: by });
						expect(puzzle.pieceInMotion).to.be.undefined;
					});
		});
		it('should start drag operation when mousedown on a piece', () => {
			cy.get(puzzle.pieces[0].dom).trigger('mousedown', { position: 'topLeft' });
			expect(puzzle.pieceInMotion).to.be.undefined;
		});
		it('should insure the piece being dragged has the largest z-index', () => {
			let zIndex = -1;
			puzzle.pieces.forEach((piece) => zIndex = Math.max(zIndex, parseInt(piece.dom.style.zIndex)));
			cy.get(puzzle.pieces[0].dom).trigger('mousedown', { position: 'topLeft' });
			expect(parseInt(puzzle.pieces[0].dom.style.zIndex)).to.be.greaterThan(zIndex);
		});
		it('should insure the piece being dragged has the "dragging" class', () => {
			cy.get(puzzle.pieces[0].dom).trigger('mousedown', { position: 'topLeft' });
			expect(parseInt(puzzle.pieces[0].classList.contains('dragging'))).to.be.true;
		});
	});

	describe('drag/drop movement', () => {
		it('should move the piece and drop inside the board', () => {
			cy.get(puzzle.pieces[0].dom).trigger('mousemove', { position: 'topLeft' })
					.trigger('mousemove', { clientX: 1, clientY: 1 })
					.trigger('mouseup', { force: true });
			const { offsetTop: boardOffsetTop, offsetLeft: boardOffsetLeft } = puzzle.board.dom;
			const { offsetTop, offsetLeft } = puzzle.pieces[0].dom;
			expect(offsetTop + pieceHeight).to.be.lessThan(boardOffsetTop + boardHeight);
			expect(offsetLeft + pieceWidth).to.be.lessThan(boardOffsetLeft + boardWidth);
		});
		it('should move piece to X=0 if any part of the piece moves off the left side of the board', () => {
			cy.get(puzzle.pieces[0].dom).trigger('mousemove', { position: 'topLeft' })
					.trigger('mousemove', { clientX: boardWidth * -2, clientY: 0 })
					.trigger('mouseup', { force: true });
			const { offsetLeft } = puzzle.pieces[0].dom;
			expect(offsetLeft).to.be.equal(0);
		});
		it('should move piece to Y=0 if any part of the piece moves off the top side of the board', () => {
			cy.get(puzzle.pieces[0].dom).trigger('mousemove', { position: 'topLeft' })
					.trigger('mousemove', { clientY: boardHeight * -2 })
					.trigger('mouseup', { force: true });
			const { offsetTop } = puzzle.pieces[0].dom;
			expect(offsetTop).to.be.equal(0);
		});
		it('should move piece to X=boardWidth-pieceWidth if any part of the piece moves off the right side of the board', () => {
			cy.get(puzzle.pieces[0].dom).trigger('mousemove', { position: 'topLeft' })
					.trigger('mousemove', { clientX: boardWidth * 2, clientY: 0 })
					.trigger('mouseup', { force: true });
			const { offsetLeft } = puzzle.pieces[0].dom;
			expect(offsetLeft).to.be.equal(boardWidth - pieceWidth);
		});
		it('should move piece to Y=boardHeight-pieceHeight if any part of the piece moves off the bottom side of the board', () => {
			cy.get(puzzle.pieces[0].dom).trigger('mousemove', { position: 'topLeft' })
					.trigger('mousemove', { clientY: boardHeight * 2 })
					.trigger('mouseup', { force: true });
			const { offsetTop } = puzzle.pieces[0].dom;
			expect(offsetTop).to.be.equal(boardHeight - pieceHeight);
		});
	});
});