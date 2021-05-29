const { v4: uuidv4 } = require('uuid');
/**
 * Class representing a Board model
 */
class Board {
  /**
   * Creates Board object
   * @param {object} Board object
   */
  constructor(board) {
    this.id = uuidv4();
    this.title = board.title;
    this.columns = board.columns;
  }

  /**
   * Checks if passed Board object contains all required properties
   * @param {object} Board object
   * @returns {boolean} Return true if Board object contains all required properties. Otherwise, return false
   */
  static validateBoard(board) {
    return (
      board.title &&
      typeof board.title === 'string' &&
      board.columns &&
      Array.isArray(board.columns)
    );
  }

  /**
   * Updates Board object with new property(ies) passed in object
   * @param {object} updated board property(ies)
   */
  updateBoard(updatedBoard) {
    this.title = updatedBoard.title || this.title;
    this.columns = updatedBoard.columns || this.columns;
  }
}

module.exports = Board;
