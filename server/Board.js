class Board{
    constructor() {
            this.squares = Array(9).fill(null),
            this.xIsNext = true
        
    }

    takeTurn(i) {
        const squares = this.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.xIsNext ? 'X' : 'O';
        this.squares = squares
        this.xIsNext = !this.xIsNext
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
            }
        }
        return null;
    }
}

module.exports = Board