import Piece from "../../src/js/classes/Piece.js";
import Vertex from "../../src/js/classes/Vertex.js";
import Puzzle from "../../src/js/classes/Puzzle.js";

describe('testing the puzzle', () => {
	let vertex1, vertex2, vertex3;
	let piece1, piece2;

	beforeEach(() => {
		vertex1 = new Vertex({ id: 1 });
		vertex2 = new Vertex({ id: 2 });
		vertex3 = new Vertex({ id: 3 });
		piece1 = new Piece({ id: 'a', vertices: [ vertex1, vertex2 ] });
		piece2 = new Piece({ id: 'b', vertices: [ vertex2, vertex3 ] });
	});

	it('should create the instance', () => {
		const puzzle = new Puzzle({ pieces: [ piece1, piece2 ] });
		expect(puzzle instanceof Puzzle).to.be.true;
	});

	it('should have a collection of Vertices that are unique', () => {

	});

	it('should have a collection of Pieces that are unique', () => {});
	it('should have all pieces connect to at least one other piece', () => {});
	it('should contain at least two pieces', () => {});
	it('should have no two pieces contain the same vertices exclusively', () => {});
});