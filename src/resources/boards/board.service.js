const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.service');
const Board = require('./board.model');

/**
 * Gets all boards from board repository
 * @returns {Array} Array of boards
 */
const getAllBoards = async () => boardsRepo.getAllBoards();

/**
 * Passes the ID of the board to Board repository to get it 
 * @param {string} the ID of the board
 * @returns {object | undefined} Board object with specified ID. If there is no board in DB with specified ID, the function will return undefined
 */
const getBoardById = async (boardId) => boardsRepo.getBoardById(boardId);

/**
 * Checks if passed Board object correct and transmit it to Board repository for adding to DB
 * @param {object} board 
 * @returns {object | boolean} If passed Board object is not valid, the function will return false value. Otherwise, it will return created Board object
 */

const createBoard = async (board) =>
  Board.validateBoard(board) ? boardsRepo.createBoard(new Board(board)) : false;

/**
 * Passes ID of the board to update and new board property(ies) to Board repository
 * @param {string} The ID of the board to update 
 * @param {object} New board property(ies)
 * @returns Board object with updated properties
 */  

const updateBoard = async (boardId, updatedBoardData) =>
  boardsRepo.updateBoard(boardId, updatedBoardData);

/**
 * Passes ID of the board to delete to Board repository. After board removing it also deletes all tasks assigned to deleted board
 * @param {string} The ID of the board to delete
 * @returns {object | boolean} If there is no Board object with specified ID in DB, the function will return false. Otherwise, it will return deleted Board object.
 */

const deleteBoard = async (boardId) => {
  const deletedBoard = await boardsRepo.deleteBoard(boardId);

  if (deletedBoard) {
    const boardTasks = await tasksRepo.getTasksByBoardId(boardId);
    boardTasks.map(async (task) => tasksRepo.deleteTask(boardId, task.id));
  }
  return deletedBoard;
};

module.exports = {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
};
