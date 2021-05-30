const { v4: uuidv4 } = require('uuid');
/**
 * Class representing a Column model
 */
class Column {
  /**
   * Creates Column object
   * @param {object} Column object
   */
  constructor(column) {
    this.id = uuidv4();
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

module.exports = Column;
