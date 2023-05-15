import GraphicPiece from "../../../src/js/classes/graphic/GraphicPiece.js";
import { imageUrl, params } from "./../../fixtures/graphicData.js";

const { puzzleWidth, puzzleHeight, pieceWidth: width, pieceHeight: height } = params;
const id = 'id';
let image = null;

before( () => {
	cy.visit('localhost:5173/index.html');
	image = new Image();
	image.src = imageUrl;
});

/*
before((done) => {
	console.log(1);
	cy.visit('localhost:5173/index.html');
	console.log(2);
	cy.get('#jigsaw-image').selectFile('./src/img/sample.jpg', { force: true })
			.then(($input) => {
				console.log(3);
				const fileIn = $input[0].files[0];
				const link = URL.createObjectURL(fileIn);
				const img = new Image();
				img.src = link;
				img.onload = () => {
					console.log(4);
					URL.revokeObjectURL(link);
					const tempCanvas = document.createElement('canvas');
					tempCanvas.width = 700;
					tempCanvas.height = 700;
					const ctx = tempCanvas.getContext('2d');
					ctx.drawImage(img, 0, 0, 500, 500);
					image = new Image();
					image.src = tempCanvas.toDataURL('image/jpg');
					console.log(image);
					done();
				};
			});
	console.log(5);

});
*/
describe('GraphicPiece', () => {
	it('should throw exception if image is not an Image', () => {
		try {
			new GraphicPiece({ image: 'badone', width, height, id });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if width is not a number', () => {
		try {
			new GraphicPiece({ image, width: 'badone', height, id });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if width is less than 1', () => {
		try {
			new GraphicPiece({ image, width: 0, height, id });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should throw exception if height is not a number', () => {
		try {
			new GraphicPiece({ image, width, height: 'badone', id });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if height is less than 1', () => {
		try {
			new GraphicPiece({ image, width, height: 0, id });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should throw exception if id is not set', () => {
		try {
			new GraphicPiece({ image, width, height });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should be the correct width/height', () => {
		const piece = new GraphicPiece({ image, width, height, id });
		expect(piece.width).to.equal(width);
		expect(piece.height).to.equal(height);
	});

	it('should contain a span and a canvas with an image', () => {
		const piece = new GraphicPiece({ image, width, height, id });
		const dom = piece.dom;
		expect(dom instanceof HTMLSpanElement).to.be.true;
		const canvas = dom.firstChild;
		expect(canvas instanceof HTMLCanvasElement).to.be.true;
		});
});