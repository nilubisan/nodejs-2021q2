const boardsRepo = require('./board.memory.repository');

const Board = require('./board.model');

const getAllBoards = () => boardsRepo.getAllBoards();
const createBoard = (board) => (Board.validateBoard(board)) ? boardsRepo.createBoard(new Board(board)) : false;
const updateBoard = (boardId, updatedBoardData) => (Board.validateBoard(updatedBoardData)) ? boardsRepo.updateBoard(boardId, updatedBoardData) : false;
const deleteBoard = (boardId) => boardsRepo.deleteBoard(boardId)
const getBoardById = (boardId) => boardsRepo.getBoardById(boardId)
module.exports = { getAllBoards, createBoard, getBoardById, updateBoard, deleteBoard };
