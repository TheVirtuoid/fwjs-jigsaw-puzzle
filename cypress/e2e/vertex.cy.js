import Vertex from "../../src/js/classes/Vertex.js";

describe('Vertex testing', () => {
	let vertex;

	beforeEach( () => {
		vertex = new Vertex({ id: 'a' });
	});

	it('should create', () => {
		expect(vertex instanceof Vertex).to.be.true;
	});

	it ('should throw error if no id specified', () => {
		try {
			const vertex = new Vertex();
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should not be able to add a property', () => {
		try {
			vertex.badProperty = true;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should not be able to change the id', () => {
		try {
			vertex.id = 'bad';
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});