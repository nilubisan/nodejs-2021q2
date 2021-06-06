import { Board, IBoardUpdated } from './board.model';

/**
 * Simulation of Boards DB {Array}
 */
const BOARDS: Array<Board> = [];

/**
 * Returns ALL boards from Boards DB
 * @returns  {Array} Array of boards. If there are no boards in DB, the function will return empty array
 */
export const getAllBoards = async ():Promise<Array<Board>> => BOARDS;

/**
 * Returns board with specified ID from Boards DB
 * @param {string} The ID of the board to get
 * @returns {object | undefined} Board object with specified ID. If there is no board in DB with specified ID, the function will return undefined
 */
export const getBoardById = async (boardId: string): Promise<Board | boolean> => {
  const board = BOARDS.find((board: Board) => board.id === boardId);
  if(!board) return false;
  else return board
}
  

/**
 * Creates new board and adds it to Boards DB
 * @param {object} a Board object with all required properties
 * @returns {object} created board with all required properties
 */

export const createBoard = async (board: Board): Promise<Board> => {
  BOARDS.push(board);
  return board;
};

/**
 * Updates the board with specified ID in Boards DB
 * @param {string} The ID of the board to update
 * @param {object} The object with new board property(ies)
 * @returns {object} Board object with updated properties
 */

export const updateBoard = async (boardId: string, updatedBoard: IBoardUpdated): Promise<Board | boolean> => {
  const ind:number = BOARDS.findIndex((board) => board.id === boardId);
  if(ind === -1) return false;
  else {
  const BoardToUpdate = BOARDS[ind] as Board;
  BoardToUpdate.updateBoard(updatedBoard);
  return BoardToUpdate;
  }
};

/**
 * Deletes the board with specified ID from Boards DB
 * @param {string} The ID of the board to delete
 * @returns {object | boolean} If there is no Board object with specified ID in DB, the function will return false. Otherwise, it will return deleted Board object.
 */
export const deleteBoard = async (boardId: string): Promise<Board | boolean> => {
  const ind: number = BOARDS.findIndex((board: Board) => board.id === boardId);
  if (ind === -1) return false;
  const deletedBoard = BOARDS.splice(ind, 1)[0] as Board;
  return deletedBoard;
};