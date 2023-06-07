import '../src/css/jigasw-puzzle.pcss';
// import GraphicPiece from "./js/classes/graphics/GraphicPiece.js";
import GraphicPuzzle from "./js/classes/graphic/GraphicPuzzle.js";
import Cut16Square from "./js/classes/patterns/Cut16Sqaure.js";

const puzzleParams = {
	width: 500,
	height: 500,
	boardWidth: 700,
	boardHeight: 700,
	rollingZ: 1,
	piece: null,
	sounds: {
		drop: new Audio('/src/sounds/686743__geoff-bremner-audio__quick-click-1.wav')
	}
}

const jigsawImage = document.getElementById('jigsaw-image');
const selectImage = document.getElementById('select-image');
const board = document.getElementById('board');
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

let graphicPuzzle;

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

go.addEventListener('click', () => {
	graphicPuzzle = new GraphicPuzzle({
		height: puzzleParams.boardHeight,
		width: puzzleParams.boardWidth,
		anchorPoint: board,
		sounds: puzzleParams.sounds
	});
	graphicPuzzle.setImage({
		image,
		width: puzzleParams.width,
		height: puzzleParams.height
	});
	graphicPuzzle.setPattern(new Cut16Square());
	graphicPuzzle.cut();
	graphicPuzzle.shuffle();
});

showCutDesign();
showNumberOfPieces();