"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoardService = exports.updateBoardService = exports.createBoardService = exports.getBoardByIdService = exports.getAllBoardsService = void 0;
const board_memory_repository_1 = require("./board.memory.repository");
const task_service_1 = require("../tasks/task.service");
const board_model_1 = require("./board.model");
/**
 * Gets all boards from board repository
 * @returns {Array} Array of boards
 */
const getAllBoardsService = async () => board_memory_repository_1.getAllBoards();
exports.getAllBoardsService = getAllBoardsService;
/**
 * Passes the ID of the board to Board repository to get it
 * @param {string} the ID of the board
 * @returns {object | undefined} Board object with specified ID. If there is no board in DB with specified ID, the function will return undefined
 */
const getBoardByIdService = async (boardId) => board_memory_repository_1.getBoardById(boardId);
exports.getBoardByIdService = getBoardByIdService;
/**
 * Checks if passed Board object correct and transmit it to Board repository for adding to DB
 * @param {object} board
 * @returns {object | boolean} If passed Board object is not valid, the function will return false value. Otherwise, it will return created Board object
 */
const createBoardService = async (board) => board_model_1.Board.validateBoard(board) ? board_memory_repository_1.createBoard(new board_model_1.Board(board)) : false;
exports.createBoardService = createBoardService;
/**
 * Passes ID of the board to update and new board property(ies) to Board repository
 * @param {string} The ID of the board to update
 * @param {object} New board property(ies)
 * @returns Board object with updated properties
 */
const updateBoardService = async (boardId, updatedBoardData) => board_memory_repository_1.updateBoard(boardId, updatedBoardData);
exports.updateBoardService = updateBoardService;
/**
 * Passes ID of the board to delete to Board repository. After board removing it also deletes all tasks assigned to deleted board
 * @param {string} The ID of the board to delete
 * @returns {object | boolean} If there is no Board object with specified ID in DB, the function will return false. Otherwise, it will return deleted Board object.
 */
const deleteBoardService = async (boardId) => {
    const deletedBoard = await board_memory_repository_1.deleteBoard(boardId);
    if (deletedBoard) {
        const boardTasks = await task_service_1.getTasksByBoardIdService(boardId);
        boardTasks.map(async (task) => task_service_1.deleteTaskService(boardId, task.id));
    }
    return deletedBoard;
};
exports.deleteBoardService = deleteBoardService;
