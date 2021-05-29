const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.service');
const Board = require('./board.model');

const getAllBoards = async () => boardsRepo.getAllBoards();

const createBoard = async (board) =>
  Board.validateBoard(board) ? boardsRepo.createBoard(new Board(board)) : false;

const updateBoard = async (boardId, updatedBoardData) =>
  boardsRepo.updateBoard(boardId, updatedBoardData);

const deleteBoard = async (boardId) => {
  const deletedBoard = await boardsRepo.deleteBoard(boardId);

  if (deletedBoard) {
    const boardTasks = await tasksRepo.getTasksByBoardId(boardId);
    boardTasks.map(async (task) => tasksRepo.deleteTask(boardId, task.id));
  }
  return deletedBoard;
};

const getBoardById = async (boardId) => boardsRepo.getBoardById(boardId);

module.exports = {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
};
