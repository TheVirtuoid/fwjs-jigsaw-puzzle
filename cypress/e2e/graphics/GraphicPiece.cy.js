import GraphicPiece from "../../../src/js/classes/graphic/GraphicPiece.js";
import { imageUrl, params } from "./../../fixtures/graphicData.js";

let piece;
const { puzzleWidth, puzzleHeight, pieceWidth, pieceHeight} = params;
let image = null;

before( () => {
	// cy.visit('localhost:5173/index.html');
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
beforeEach(() => {
	piece = new GraphicPiece({
		image,
		puzzleWidth,
		puzzleHeight
	});
});
describe('GraphicPiece', () => {
	it('should be the correct width/height', () => {
		expect(piece.width).to.equal(pieceWidth);
		expect(piece.height).to.equal(pieceHeight);
		expect(false).to.be.true;
	});
	it('should contain a span and a canvas with an image', () => {
		const dom = piece.dom;
		expect(dom instanceof HTMLSpanElement).to.be.true;
		const canvas = dom.firstChild;
		expect(canvas instanceof HTMLCanvasElement).to.be.true;
		});
});