/*
1. There will exist a Game object that will control the game
2. It will create and initialize the Puzzle object
3. It will create and initialize the Graphics object
4. It will determine the number of pieces needed for a single play of the game
5. It will determine what graphics image to use.
6. It will determine what cutting design to use.
7. It will cut the puzzle
8. It will play the game as described in the 'Order of Play' section
9. It will shut down the graphics object
10. It will shut down the puzzle object
11. It will receive communications from the Graphics object as to the placement of a pieces
    1. This is so that it can determine if two pieces are close enough to connect
 */

import Game from "../../src/js/classes/Game.js";

let game;
beforeEach(() => {
	game = new Game();
});

describe('Game: ', () => {
	it('should create the Puzzle object', () => {
		game.createPuzzle();
		expect(game.puzzleCreated).to.be.true;
	});
	it('should throw error if trying to create a second Puzzle object', () => {
		try {
			game.createPuzzle();
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should create the Graphics object', () => {
		game.createGraphics();
		expect(game.graphicsCreated).to.be.true;
	});
	it('should throw error if more than one graphics object is created', () => {
		try {
			game.createGraphics();
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	// TODO: We need to have a 'Cut' class that defines the different types of cuts
	it('should cut the puzzle', () => {
		game.createPuzzle();
		game.setPieces(16);
		game.setCut('standard');
		game.cutPieces();
		expect(game.getPieceCount).to.equal(16);
	});
});
