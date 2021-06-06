import {getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard} from './board.memory.repository';
import { getTasksByBoardIdService, deleteTaskService } from '../tasks/task.service';
import { Board, IBoardUpdated } from './board.model';
import { Task } from '../tasks/task.model';

/**
 * Gets all boards from board repository
 * @returns {Array} Array of boards
 */
export const getAllBoardsService = async (): Promise<Board[]> => getAllBoards();

/**
 * Passes the ID of the board to Board repository to get it
 * @param {string} the ID of the board
 * @returns {object | undefined} Board object with specified ID. If there is no board in DB with specified ID, the function will return undefined
 */
export const getBoardByIdService = async (boardId: string): Promise<Board | boolean> => getBoardById(boardId);

/**
 * Checks if passed Board object correct and transmit it to Board repository for adding to DB
 * @param {object} board
 * @returns {object | boolean} If passed Board object is not valid, the function will return false value. Otherwise, it will return created Board object
 */

export const createBoardService = async (board: Board): Promise<Board | boolean> =>
  Board.validateBoard(board) ? createBoard(new Board(board)) : false;

/**
 * Passes ID of the board to update and new board property(ies) to Board repository
 * @param {string} The ID of the board to update
 * @param {object} New board property(ies)
 * @returns Board object with updated properties
 */

export const updateBoardService = async (boardId: string, updatedBoardData: IBoardUpdated): Promise<Board | boolean> =>
updateBoard(boardId, updatedBoardData);

/**
 * Passes ID of the board to delete to Board repository. After board removing it also deletes all tasks assigned to deleted board
 * @param {string} The ID of the board to delete
 * @returns {object | boolean} If there is no Board object with specified ID in DB, the function will return false. Otherwise, it will return deleted Board object.
 */

export const deleteBoardService = async (boardId: string): Promise<Board | boolean> => {
  const deletedBoard = await deleteBoard(boardId);
  if (deletedBoard) {
    const boardTasks = await getTasksByBoardIdService(boardId);
    boardTasks.map(async (task: Task) => deleteTaskService(boardId, task.id));
  }
  return deletedBoard;
};

