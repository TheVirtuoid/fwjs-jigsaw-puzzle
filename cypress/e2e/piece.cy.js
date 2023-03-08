import Piece from "../../src/js/classes/Piece.js";
import Vertex from "../../src/js/classes/Vertex.js";

describe('Piece: ', () => {

	/*
			const piece = new Piece({ id: <someId> });
	 */
	describe('creating default: ', () => {
		it('should throw error if no id is specified', () => {});
		it('should create if id only specified', () => {});
		it('should default to no vertices', () => {});
		it('should throw error as id cannot be changed', () => {});
		it('should throw error as no property can be added', () => {});
	});

	/*
		const piece = new Piece({ id: <someId>, vertices: [vtx1, vtx2, ... vtxZ] });
	 */
	describe('creating with vertices property: ', () => {
		it('should throw error if vertices argument is not array or vertex object', () => {});
		it('should return the correct number of vertices', () => {});
		it('should throw error as vertices property cannot be changed', () => {});
	});

	/*
			piece.addVertex(vtx);
	 */
	describe('addVertex: ', () => {
		it('should throw error if argument is not a Vertex', () => {});
		it('should throw error if vertex is already in the collection', () => {});
		it('should add the vertex to the collection', () => {});
		it('should return the piece', () => {});
	});

	/*
			piece.addVertices([vtx1, vtx2, ..., vtxZ]);
	 */
	describe('addVertices: ', () => {
		it('should throw error if argument is not an array of Vertices', () => {});
		it('should throw error if at least one of the vertices is in the collection', () => {});
		it('given at least one vertices is in the collection, should not add ANY vertices', () => {});
		it('should add the vertices to the collection', () => {});
		it('should return the piece', () => {});
	});

	/*
			piece.removeVertex(vtx);
	 */
	describe('removing a vertex: ', () => {
		it('should throw error if argument is not a vertex', () => {});
		it('should remove the vertex', () => {});
		it('should return the piece', () => {});
		it('should throw error if vertex cannot be found in the collection', () => {});
	});

	/*
			piece.removeVertices([vtx1, vtx2, ..., vtxZ]);
	 */
	describe('removeVertices: ', () => {
		it('should throw error if argument is not an array of vertices', () => {});
		it('should remove all the vertices', () => {});
		it('should return the piece', () => {});
		it('should throw error if at least one of the vertices cannot be found in the collection', () => {});
		it('if at least one vertex cannot be found, should NOT remove any vertices', () => {});
	});

	/*
			piece.clearVertices();
	 */
	describe('clearVertices: ', () => {
		it('should clear all vertices', () => {});
	});

	/*
			const vertices = piece.isConnectedTo(secondPiece);

			A connection is defined as at least one Vertex in a piece can be found in another piece.
			We return either an array of vertices if matched, or Boolean false if not matched.
	 */
	describe('isConnectedTo: ', () => {
		it('should throw error if secondPiece argument is not a Piece', () => {});
		it('should return false if the two pieces are not connected', () => {});
		it('should return array of vertices if pieces are connected', () => {});
	});

	/*
			const newPiece = piece.merge(secondPiece)
	 */
	describe('merge: ', () => {
		it('should throw error if secondPiece argument is not a Piece', () => {});
		it('should return a new piece with all the vertices combined', () => {});
		it('should clear all vertices from piece', () => {});
		it('should clear all vertices from secondPiece', () => {});
	});

});