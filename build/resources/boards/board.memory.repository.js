"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getBoardById = exports.getAllBoards = void 0;
/**
 * Simulation of Boards DB {Array}
 */
const BOARDS = [];
/**
 * Returns ALL boards from Boards DB
 * @returns  {Array} Array of boards. If there are no boards in DB, the function will return empty array
 */
const getAllBoards = async () => BOARDS;
exports.getAllBoards = getAllBoards;
/**
 * Returns board with specified ID from Boards DB
 * @param {string} The ID of the board to get
 * @returns {object | undefined} Board object with specified ID. If there is no board in DB with specified ID, the function will return undefined
 */
const getBoardById = async (boardId) => {
    const board = BOARDS.find((board) => board.id === boardId);
    if (!board)
        return false;
    else
        return board;
};
exports.getBoardById = getBoardById;
/**
 * Creates new board and adds it to Boards DB
 * @param {object} a Board object with all required properties
 * @returns {object} created board with all required properties
 */
const createBoard = async (board) => {
    BOARDS.push(board);
    return board;
};
exports.createBoard = createBoard;
/**
 * Updates the board with specified ID in Boards DB
 * @param {string} The ID of the board to update
 * @param {object} The object with new board property(ies)
 * @returns {object} Board object with updated properties
 */
const updateBoard = async (boardId, updatedBoard) => {
    const ind = BOARDS.findIndex((board) => board.id === boardId);
    if (ind === -1)
        return false;
    else {
        const BoardToUpdate = BOARDS[ind];
        BoardToUpdate.updateBoard(updatedBoard);
        return BoardToUpdate;
    }
};
exports.updateBoard = updateBoard;
/**
 * Deletes the board with specified ID from Boards DB
 * @param {string} The ID of the board to delete
 * @returns {object | boolean} If there is no Board object with specified ID in DB, the function will return false. Otherwise, it will return deleted Board object.
 */
const deleteBoard = async (boardId) => {
    const ind = BOARDS.findIndex((board) => board.id === boardId);
    if (ind === -1)
        return false;
    const deletedBoard = BOARDS.splice(ind, 1)[0];
    return deletedBoard;
};
exports.deleteBoard = deleteBoard;
