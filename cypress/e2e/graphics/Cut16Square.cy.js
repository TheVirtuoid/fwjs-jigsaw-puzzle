// Cut 16 pieces in a square
import Cut16Square from "../../../src/js/classes/patterns/Cut16Sqaure.js";
import { imageUrl, params } from "../../fixtures/graphicData.js";

let cut16;
let image;
const { puzzleHeight, puzzleWidth } = params;
beforeEach( () => {
	cut16 = new Cut16Square();
	image = new Image();
	image.src = imageUrl;
});

describe('cut16Square', () => {
	it('should return 16 pieces', () => {
		expect(cut16.numPieces).to.equal(16);
	});
	it('should return square cut', () => {
	expect(cut16.cutType).to.equal('square');
	});

	describe('cut method', () => {
		it('should throw exception if argument is not an Image', () => {
			try {
				cut16.cut({ image: 'badone', puzzleHeight, puzzleWidth });
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw exception if puzzleHeight is not a number', () => {
			try {
				cut16.cut({ image: image, puzzleHeight: 'badone', puzzleWidth });
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw exception if puzzleHeight is less than 1', () => {
			try {
				cut16.cut({ image: image, puzzleHeight: 0, puzzleWidth });
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('should throw exception if puzzleWidth is not a number', () => {
			try {
				cut16.cut({ image: image, puzzleHeight, puzzleWidth: 'badone' });
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw exception if puzzleWidth is less than 1', () => {
			try {
				cut16.cut({ image: image, puzzleHeight, puzzleWidth: 0 });
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('should create the pieces', () => {
			const pieces = cut16.cut({ image, puzzleHeight, puzzleWidth });
			expect(pieces.length).to.equal(cut16.numPieces);
		});
	});
});