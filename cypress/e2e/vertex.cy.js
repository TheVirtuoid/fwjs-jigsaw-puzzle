import Vertex from "../../src/js/classes/Vertex.js";

describe('Vertex testing', () => {
	it ('should throw error if no id specified', () => {
		try {
			const vertex = new Vertex();
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should not be able to add a property', () => {
		const vertex = new Vertex({ id: 'a' });
		try {
			vertex.badProperty = true;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should not be able to change the id', () => {
		const vertex = new Vertex({ id: 'a' });
		try {
			vertex.id = 'bad';
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});