import Vertex from "../../src/js/classes/Vertex.js";

describe('Vertex testing', () => {
	it('should not be able to add a property', () => {
		const vertex = new Vertex({ id: 'a' });
		try {
			vertex.badProperty = true;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});