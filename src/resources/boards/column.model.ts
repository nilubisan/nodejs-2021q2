import { v4 as uuidv4 } from 'uuid';
/**
 * Class representing a Column model
 */
export class Column {
  /**
   * Creates Column object
   * @param {object} Column object
   */
  id: string
  title: string
  order: number

  constructor(column: Column) {
    this.id = uuidv4();
    this.title = column.title;
    this.order = column.order;
  }

  /**
   * Updates Column object with new property(ies) passed in object
   * @param {object} updated column property(ies)
   */
  updateColumn(column: Column):void {
    this.title = column.title || this.title;
    this.order = column.order || this.order;
  }
}

module.exports = Column;
