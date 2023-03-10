import Vertex from "../../src/js/classes/Vertex.js";
import Piece from "../../src/js/classes/Piece.js";


describe('Piece: ', () => {

	/*
			const piece = new Piece();
	 */
	describe('creating default: ', () => {
		it('should create', () => {
			const piece = new Piece();
			expect(piece instanceof Piece).to.be.true;
		});
		it('should default to no vertices', () => {
			const piece = new Piece();
			expect(piece.vertexCount).to.equal(0);
		});
		it('should throw error as vertices cannot be changed', () => {
			const piece = new Piece({ vertices: [] });
			try {
				piece.vertices = 'b';
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error as no property can be added', () => {
			const piece = new Piece();
			try {
				piece.newProperty = true;
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
	});

	/*
		const piece = new Piece({ vertices: [vtx1, vtx2, ... vtxZ] });
	 */
	describe('creating with vertices property: ', () => {
		it('should throw error if vertices argument is not array or vertex object', () => {
			try {
				const piece = new Piece({ vertices: 'badone' });
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should return the correct number of vertices', () => {
			const vertex = new Vertex();
			const piece1 = new Piece({ vertices: [vertex]});
			expect(piece1.vertexCount).to.equal(1);
		});
		it('should throw error as vertices property cannot be changed', () => {
			const piece = new Piece({ vertices: [] });
			try {
				piece.vertices = 'badone';
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
	});

	/*
			piece.addVertex(vtx);
	 */
	describe('addVertex: ', () => {
		it('should throw error if argument is not a Vertex', () => {
			const piece = new Piece({ vertices: [] });
			try {
				piece.addVertex('badone');
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if vertex is already in the collection', () => {
			const vertex = new Vertex();
			const piece = new Piece({ vertices: [vertex] });
			try {
				piece.addVertex(vertex);
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('should add the vertex to the collection', () => {
			const vertex = new Vertex();
			const piece = new Piece({ vertices: [] });
			piece.addVertex(vertex);
			expect(piece.vertexCount).to.equal(1);
		});
		it('should return the piece', () => {
			const vertex = new Vertex();
			const piece = new Piece({ vertices: [] });
			const newPiece = piece.addVertex(vertex);
			expect(newPiece === piece).to.be.true;
		});
	});

	/*
			piece.addVertices([vtx1, vtx2, ..., vtxZ]);
	 */
	describe('addVertices: ', () => {
		it('should throw error if argument is not an array of Vertices', () => {
			const piece = new Piece({ vertices: [] });
			try {
				piece.addVertices('badone');
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if at least one of the vertices is in the collection', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex2] });
			try {
				piece.addVertices([vertex1, vertex2]);
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('given at least one vertices is in the collection, should not add ANY vertices', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex2] });
			try {
				piece.addVertices([vertex1, vertex2]);
				expect(true).to.be.false;
			} catch (err) {
				expect(piece.vertexCount).to.equal(1);
			}
		});
		it('should throw error is duplicate vertices are found in vertices argument', () => {
			const vertex1 = new Vertex();
			const piece = new Piece();
			try {
				piece.addVertices([vertex1, vertex1]);
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('given a duplicate error, should not add ANY vertices', () => {
			const vertex1 = new Vertex();
			const piece = new Piece();
			try {
				piece.addVertices([vertex1, vertex1]);
				expect(true).to.be.false;
			} catch (err) {
				expect(piece.vertexCount).to.equal(0);
			}
		});
		it('should add the vertices to the collection', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [] });
			piece.addVertices([vertex1, vertex2]);
			expect(piece.vertexCount).to.equal(2);
		});
		it('should return the piece', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [] });
			const newPiece = piece.addVertices([vertex1, vertex2]);
			expect(newPiece === piece).to.be.true;
		});
	});

	/*
			piece.removeVertex(vtx);
	 */
	describe('removing a vertex: ', () => {
		it('should throw error if argument is not a vertex', () => {
			const vertex1 = new Vertex();
			const piece = new Piece({ vertices: [vertex1] });
			try {
				piece.removeVertex('badone');
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should remove the vertex', () => {
			const vertex = new Vertex();
			const piece = new Piece({ vertices: [vertex] });
			piece.removeVertex(vertex);
			expect(piece.vertexCount).to.equal(0);
		});
		it('should return the piece', () => {
			const vertex = new Vertex();
			const piece = new Piece({ vertices: [vertex] });
			const newPiece = piece.removeVertex(vertex);
			expect(newPiece === piece).to.be.true;
		});
		it('should throw error if vertex cannot be found in the collection', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1] });
			try {
				piece.removeVertex(vertex2);
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
	});

	/*
			piece.removeVertices([vtx1, vtx2, ..., vtxZ]);
	 */
	describe('removeVertices: ', () => {
		it('should throw error if argument is not an array of vertices', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1] });
			try {
				piece.removeVertices('badone');
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should remove all the vertices', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1, vertex2] });
			piece.removeVertices([vertex1, vertex2]);
			expect(piece.vertexCount).to.equal(0);
		});
		it('should return the piece', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1, vertex2] });
			const newPiece = piece.removeVertices([vertex1, vertex2]);
			expect(newPiece === piece).to.be.true;
		});
		it('should throw error if at least one of the vertices cannot be found in the collection', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1] });
			try {
				piece.removeVertices([vertex1, vertex2]);
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('if at least one vertex cannot be found, should NOT remove any vertices', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1] });
			try {
				piece.removeVertices([vertex1, vertex2]);
				expect(true).to.be.false;
			} catch (err) {
				expect(piece.vertexCount).to.equal(1);
			}
		});
		it('should throw error is duplicate vertices are found in vertices argument', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1, vertex2] });
			try {
				piece.removeVertices([vertex1, vertex1]);
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('RangeError');
			}
		});
		it('given a duplicate error, should not remove ANY vertices', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1, vertex2] });
			try {
				piece.removeVertices([vertex1, vertex1]);
				expect(true).to.be.false;
			} catch (err) {
				expect(piece.vertexCount).to.equal(2);
			}
		});
	});

	/*
			piece.clearVertices();
	 */
	describe('clearVertices: ', () => {
		it('should clear all vertices', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1, vertex2] });
			piece.clearVertices();
			expect(piece.vertexCount).to.equal(0);
		});
		it('should return the array of cleared vertices', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece = new Piece({ vertices: [vertex1, vertex2] });
			const vertices = piece.clearVertices();
			expect(vertices.length).to.equal(2);
		});
	});

	/*
			const vertices = piece.isConnectedTo(secondPiece);

			A connection is defined as at least one Vertex in a piece can be found in another piece.
			We return either an array of vertices if matched, or Boolean false if not matched.
	 */
	describe('isConnectedTo: ', () => {
		it('should throw error if secondPiece argument is not a Piece', () => {
			const piece = new Piece({ vertices: [] });
			try {
				piece.isConnectedTo('badone');
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should return false if the two pieces are not connected', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece1 = new Piece({ vertices: [vertex1] });
			const piece2 = new Piece({ vertices: [vertex2] });
			expect(piece1.isConnectedTo(piece2)).to.be.false;
		});
		it('should return array of vertices if pieces are connected', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const piece1 = new Piece({ vertices: [vertex1] });
			const piece2 = new Piece({ vertices: [vertex1, vertex2] });
			expect(piece1.isConnectedTo(piece2).length).to.equal(1);
		});
	});

	/*
			const newPiece = piece.merge(secondPiece)
	 */
	describe('merge: ', () => {
		it('should throw error if secondPiece argument is not a Piece', () => {
			const piece = new Piece({ vertices: [] });
			try {
				piece.merge('badone');
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should return a new piece with all the vertices combined', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const vertex3 = new Vertex();
			const piece1 = new Piece({ vertices: [vertex1, vertex2]});
			const piece2 = new Piece({ vertices: [vertex2, vertex3]});
			const newPiece = piece1.merge(piece2);
			expect(newPiece.vertexCount).to.equal(3);
		});
		it('should clear all vertices from piece', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const vertex3 = new Vertex();
			const piece1 = new Piece({ vertices: [vertex1, vertex2]});
			const piece2 = new Piece({ vertices: [vertex2, vertex3]});
			const newPiece = piece1.merge(piece2);
			expect(piece1.vertexCount).to.equal(0);
		});
		it('should clear all vertices from secondPiece', () => {
			const vertex1 = new Vertex();
			const vertex2 = new Vertex();
			const vertex3 = new Vertex();
			const piece1 = new Piece({ vertices: [vertex1, vertex2]});
			const piece2 = new Piece({ vertices: [vertex2, vertex3]});
			const newPiece = piece2.merge(piece2);
			expect(piece2.vertexCount).to.equal(0);
		});
	});

	/*
			const vertexExist = piece.isVertexPresent(vertex)
	 */
	describe('isVertexPresent: ', () => {
		it('should throw error is argument is not Vertex', () => {
			const piece = new Piece({ vertices: [] });
			try {
				piece.isVertexPresent('badone');
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should return false if vertex is not present', () => {
			const vertex1 = new Vertex();
			const piece = new Piece({ vertices: [] });
			const vertexPresent = piece.isVertexPresent(vertex1);
			expect(vertexPresent).to.be.false;
		});
		it('should return true if vertex is present', () => {
			const vertex1 = new Vertex();
			const piece = new Piece({ vertices: [vertex1] });
			const vertexPresent = piece.isVertexPresent(vertex1);
			expect(vertexPresent).to.be.true;
		});
	});
});