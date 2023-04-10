let jigsawImage;
let selectImage;
let selectPieces;
let selectCut;
let go;
let numberOfPieces;
let selectedNumberOfPieces;

beforeEach(() => {
	cy.visit('http://localhost:4173');
	jigsawImage = cy.get('#jigsaw-image');
	selectImage = cy.get('#select-image');
	selectPieces = cy.get('#select-pieces');
	selectCut = cy.get('#select-cut');
	go = cy.get('#go');
	numberOfPieces = cy.get('#number-of-pieces');
	selectedNumberOfPieces = cy.get('#selected-number-of-pieces');
});
describe('testing browser', () => {
	xit('should be able to select an image', () => {
		const jigsawImage = cy.get('#jigsaw-image')
		jigsawImage.selectFile('cypress/fixtures/test.jpg', { force: true });
		jigsawImage
				.then((jqElement) => {
					const element = jqElement.get(0);
					console.log(element);
					const clickSpy = cy.spy(element, 'click');
					const otherSpy = cy.spy(jigsawImage, 'click');
					/*cy.get('#select-image')
							.then((jqElement) => {
								const element = jqElement.get(0);
								console.log(element);
								element.click();
								expect(clickSpy).to.be.called;
							});*/
					cy.get('#select-image').click();
					cy.wait(1000)
							.then(() => {
								expect(otherSpy).to.be.called;
							});
				});
	});
	it('tester', () => {
		const spy = cy.spy(jigsawImage, 'click');
		selectImage.click();
		cy.wait(1000);
		expect(spy).to.be.called;
	});
	// TODO: How do you select a file that isn't there?
	xit('should throw error is incorrect image is selected', () => {});
	xit('should select the number of pieces', () => {

	});
	xit('should select the cut design', () => {});
	xit ('should launch the game', () => {});

	describe('The Game itself', () => {
		xit('should cut the pieces', () => {});
		xit('should randomize the pieces', () => {});
		xit('should pick up a piece', () => {});
		xit('should place down a piece', () => {});
		xit('should determine if two pieces are close enough to each other', () => {});
		xit('should reject any connection', () => {});
		xit('should make a connection', () => {});
		xit('should not end the game if there are more than one piece left', () => {});
		xit('should end the game if there is only one piece left', () => {});
		xit('should not allow to pick up if game has ended', () => {});
	});
});