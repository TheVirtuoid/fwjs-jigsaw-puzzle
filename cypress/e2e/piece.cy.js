import Piece from "../../src/js/classes/Piece.js";
import Vertex from "../../src/js/classes/Vertex.js";

describe('Piece testing', () => {
	let piece = null;

	beforeEach(() => {
		piece = new Piece({ id: 2, vertices: [
				new Vertex({ id: 'a' }),
				new Vertex({ id: 'b' })
			]
		});
	});

	it('should create a Piece', () => {
		expect(piece instanceof Piece).to.be.true;
	});

	it('should return an array of vertices', () => {
		expect(Array.isArray(piece.vertices)).to.be.true;
		expect(piece.vertices.length).to.equal(2);
	});

	it('should throw error if no id specified', () => {
		try {
			const piece = new Piece({ vertices: [
					new Vertex({ id: 'a' }),
					new Vertex({ id: 'b' })
				]
			});
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should throw error if no vertices is specified', () => {
		try {
			const piece = new Piece({ id: 'v' });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should throw error is vertices is not an array of vertices', () => {
		try {
			const piece = new Piece({ id: 'v', vertices: 'a' });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}

		try {
			const piece = new Piece({ id: 'v', vertices: [ 'a' ] });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should throw error on empty array', () => {
		try {
			const piece = new Piece({ id: 'v', vertices: [] });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}

	});

	it('should not be able to add a property', () => {
		try {
			piece.badProperty = true;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should not be able to change a property', () => {
		try {
			piece.id = 'bad';
			expect(true).to.be.false;
		}	catch (err) {
			expect(err.name).to.equal('TypeError');
		}
		try {
			piece.vertices = 'bad';
			expect(true).to.be.false;
		}	catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should not be able to add/subtract to/from the vertices', () => {
		try {
			piece.vertices.push(new Vertex({ id: 3 }));
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});

});