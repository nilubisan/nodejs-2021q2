"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid_1 = require("uuid");
/**
 * Class representing a Board model
 */
class Board {
    constructor(board) {
        this.id = uuid_1.v4();
        this.title = board.title;
        this.columns = board.columns;
    }
    /**
     * Checks if passed Board object contains all required properties
     * @param {object} Board object
     * @returns {boolean} Return true if Board object contains all required properties. Otherwise, return false
     */
    static validateBoard(board) {
        if (board.title &&
            typeof board.title === 'string' &&
            board.columns &&
            Array.isArray(board.columns))
            return true;
        else
            return false;
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
exports.Board = Board;
