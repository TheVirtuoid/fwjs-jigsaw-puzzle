// Cut 16 pieces in a square
import Cut16Square from "../../../src/js/classes/cuts/Cut16Sqaure.js";

describe('cut16Square', () => {
	it('should return 16 pieces', () => {
		const cut16 = new Cut16Square();
		expect(cut16.numPieces).to.equal(16);
	});
	it('should return square cut', () => {
		const cut16 = new Cut16Sqaure();
		expect(cut16.cutType).to.equal('square');
	});
	it('should create the pieces', () => {
		const cut16 = new Cut16Square();
		// todo: load up image
		const image = null;
		const pieces = cut16.cut(image);
		expect(pieces.length).to.equal(16);
	});
});