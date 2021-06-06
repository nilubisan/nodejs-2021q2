import { v4 as uuidv4 } from 'uuid';
import { Column } from './column.model'
/**
 * Class representing a Board model
 */

export class Board {
  /**
   * Creates Board object
   * @param {object} Board object
   */
  id: string
  title: string
  columns: Array<Column>

  constructor(board: Board) {
    this.id = uuidv4();
    this.title = board.title;
    this.columns = board.columns;
  }

  /**
   * Checks if passed Board object contains all required properties
   * @param {object} Board object
   * @returns {boolean} Return true if Board object contains all required properties. Otherwise, return false
   */
  static validateBoard(board: Board): boolean {
    if(
      board.title &&
      typeof board.title === 'string' &&
      board.columns &&
      Array.isArray(board.columns)
      ) return true;
    else return false;
  }

  /**
   * Updates Board object with new property(ies) passed in object
   * @param {object} updated board property(ies)
   */
  updateBoard(updatedBoard: IBoardUpdated):void {
    this.title = updatedBoard.title || this.title;
    this.columns = updatedBoard.columns || this.columns;
  }
}

export interface IBoardUpdated {
  title?: string
  columns?: Array<Column>
}