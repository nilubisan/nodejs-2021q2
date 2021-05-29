const { v4: uuidv4 } = require('uuid');

class Column {
  constructor(column) {
    this.id = uuidv4();
    this.title = column.title;
    this.order = column.order;
  }

  updateColumn(column) {
    this.title = column.title || this.title;
    this.order = column.order || this.order;
  }
}

module.exports = Column;
