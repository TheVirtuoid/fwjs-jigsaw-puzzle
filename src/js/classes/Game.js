import Puzzle from "./Puzzle.js";
import Graphics from "./Graphics.js";

export default class Game {
	#puzzle = null;
	#graphics = null;
	#image = null;
	#puzzleCreated = false;
	#graphicsCreated = false;
	#imageLoaded = false;

	createPuzzle() {
		if (this.#puzzleCreated) {
			throw new RangeError('Puzzle has already been created');
		}
		this.#puzzle = new Puzzle();
		this.#puzzleCreated = true;
	}

	createGraphics() {
		if (this.#graphicsCreated) {
			throw new RangeError('Graphics object has already been created');
		}
		this.#graphics = new Graphics();
		this.#graphicsCreated = true;
	}

	loadImage() {
		return new Promise((resolve, reject) => {});
	}

	get puzzleCreated() {
		return this.#puzzleCreated;
	}

	get graphicsCreated() {
		return this.#graphicsCreated;
	}

	get imageLoaded() {
		return this.#imageLoaded;
	}

}