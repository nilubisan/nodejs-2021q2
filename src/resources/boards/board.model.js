const { v4: uuidv4 } = require('uuid');

class Board {
  constructor(board) {
    this.id = uuidv4();
    this.title = board.title;
    this.columns = board.columns;
  }

  static validateBoard(board) {
    return ((board.title && typeof board.title === 'string')
    &&
    (board.columns && Array.isArray(board.columns))
    )
  }
}

module.exports = Board;
