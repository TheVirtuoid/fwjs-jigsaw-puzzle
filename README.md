# fwjs-jigsaw-puzzle
Fun With JavaScript presents Jigsaw Puzzle

## Design

Note: For all immutable objects, use ```Object.seal()```.

1. There must exist a 'Vertex' that:
   1. Contains a unique identifier
   2. Is immutable
2. There must exist a 'Piece' that:
   1. Contains an array of Vertices
   2. Must contain at least 1 Vertex
   3. Contains a unique identifier
   4. Is immutable
3. Pieces can share vertices
   1. When two pieces share two or more vertices, they are said to be connected.
4. There must exist a 'Puzzle' that:
   1. Contains at least two Pieces
   2. The collection of pieces will not have duplicate identifiers
   3. The collection of vertices will not have duplicate identifiers
   4. No two pieces will contain the same vertices. That is, the collection
   of vertices in one piece must not be the same collection of vertices in 
   a second piece.
   5. Each piece must have a connection with at least one other piece. No
   pieces are to be orphaned.

## Order of Play

1. A puzzle is selected
2. Pieces are randomized
3. Player 'picks up' a piece, moves it, and places it next to another piece
4. Each vertex in a piece is compared against the vertices in another piece
as long as the vertices are close together graphically.
5. If the two vertices are close enough, then the vertices are compared
6. If the two vertices are the same, it is considered a match, and the next
vertex is checked.
7. After checking all vertices, if the piece has two or more vertices that
match to the other piece, the two pieces are placed together and then 
be moved together.
8. The game is over when there are no individual pieces.

