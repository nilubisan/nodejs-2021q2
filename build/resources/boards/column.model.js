"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const uuid_1 = require("uuid");
/**
 * Class representing a Column model
 */
class Column {
    constructor(column) {
        this.id = uuid_1.v4();
        this.title = column.title;
        this.order = column.order;
    }
    /**
     * Updates Column object with new property(ies) passed in object
     * @param {object} updated column property(ies)
     */
    updateColumn(column) {
        this.title = column.title || this.title;
        this.order = column.order || this.order;
    }
}
exports.Column = Column;
module.exports = Column;
