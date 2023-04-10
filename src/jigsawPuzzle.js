import '../src/css/jigasw-puzzle.pcss';

const puzzle = {
	width: 500,
	height: 500
}

const jigsawImage = document.getElementById('jigsaw-image');
const selectImage = document.getElementById('select-image');
const board = document.querySelector('#board canvas');
const tempCanvas = document.getElementById('temp');

const selectPieces = document.getElementById('select-pieces');
const numberOfPiecesDialog = document.getElementById('number-of-pieces');
const selectedNumberOfPieces = document.getElementById('selected-number-of-pieces');
const displayNumberOfPieces = document.getElementById('display-number-of-pieces');
let numberOfPieces = 16;

const selectCut = document.getElementById('select-cut');
const cutDesignDialog = document.getElementById('cut-design');
const selectedCutDesign = document.getElementById('selected-cut-design');
const displayCutDesign = document.getElementById('display-cut-design');
let cutDesign = 'square';

const go = document.getElementById('go');

const cut = document.getElementById('cut');

const borderWidth = 0;

const showNumberOfPieces = () => displayNumberOfPieces.textContent = numberOfPieces;
const showCutDesign = () => displayCutDesign.textContent = cutDesign;

selectImage.addEventListener('click', () => {
	jigsawImage.click();
});

let img;
let image;

jigsawImage.addEventListener('input', (event) => {
	const link = URL.createObjectURL(jigsawImage.files[0]);
	img = new Image();
	img.src = link;
	img.onload = () => {
		URL.revokeObjectURL(link);
		/*const ctx = board.getContext('2d');
		ctx.drawImage(img, 0, 0, 500, 500);*/
		const ctx = tempCanvas.getContext('2d');
		ctx.drawImage(img, 0, 0, 500, 500);
		image = new Image();
		image.src = tempCanvas.toDataURL('image/jpg');
	};
});

selectPieces.addEventListener('click', () => {
	numberOfPiecesDialog.showModal();
});

numberOfPiecesDialog.addEventListener('close', () => {
	if (numberOfPiecesDialog.returnValue === 'ok') {
		numberOfPieces = selectedNumberOfPieces.value;
		showNumberOfPieces();
	}
});

selectCut.addEventListener('click', () => {
	cutDesignDialog.showModal();
});

cutDesignDialog.addEventListener('close', () => {
	if (cutDesignDialog.returnValue === 'ok') {
		cutDesign = selectedCutDesign.value;
		showCutDesign();
	}
});

const cutPieces = () => {
	const rows = Math.sqrt(numberOfPieces);
	const cols = Math.sqrt(numberOfPieces);
	const spanHeight = puzzle.height / cols - borderWidth; // height / # cols - border
	const spanWidth = puzzle.width / rows - borderWidth; // width / # rows - border
	while (cut.firstChild) {
		cut.removeChild(cut.firstChild);
	}
	for(let r = 0; r < rows; r++) {
		for(let c = 0; c < cols; c++) {
			const span = document.createElement('span');
			span.style.height = `${spanHeight}px`;
			span.style.width = `${spanWidth}px`;
			span.style.top = `${r * (spanHeight + borderWidth)}px`;
			span.style.left = `${c * (spanWidth + borderWidth)}px`;
			const canvas = document.createElement('canvas');
			canvas.width = spanWidth;
			canvas.height = spanHeight;
			const context = canvas.getContext('2d');
			/*context.drawImage(img, c * spanWidth, r * spanHeight, spanWidth, spanHeight, 0, 0, canvas.width, canvas.height);*/
			context.drawImage(image, c * spanWidth, r * spanHeight, spanWidth, spanHeight, 0, 0, canvas.width, canvas.height);
			span.appendChild(canvas);
			cut.appendChild(span);
		}
	}
};

go.addEventListener('click', () => {
	cutPieces();
});

showCutDesign();
showNumberOfPieces();