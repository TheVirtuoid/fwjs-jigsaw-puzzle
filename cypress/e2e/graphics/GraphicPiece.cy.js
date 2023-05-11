import GraphicPiece from "../../../src/js/classes/graphic/GraphicPiece.js";

let piece;
const canvasWidth = 700;
const canvasHeight = 700;
const puzzleWidth = 500;
const puzzleHeight = 500;
const pieceWidth = puzzleWidth / 4;
const pieceHeight = puzzleHeight / 4;
let image = null;

before(() => {
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
					// 	done();
				};
			});
	console.log(5);

});
beforeEach(() => {
	console.log(6);

	piece = new GraphicPiece({
		image,
		puzzleWidth,
		puzzleHeight
	});
});
describe('GraphicPiece', () => {
	it('should be the correct width/height', () => {
		console.log(7);

		console.log(piece);
		console.log(piece.width, puzzleWidth);
		expect(piece.width).to.equal(puzzleWidth);
		expect(piece.height).to.equal(puzzleHeight);
		expect(false).to.be.true;
	});
	it('should contain a span and a canvas with an image', () => {
		const dom = piece.dom;
		expect(dom instanceof HTMLSpanElement).to.be.true;
		const canvas = dom.firstChild;
		expect(canvas instanceof HTMLCanvasElement).to.be.true;
		});
});