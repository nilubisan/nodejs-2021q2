const { v4: uuidv4 } = require('uuid');
/**
 * Class representing a Task model
 */
export class Task {
  /**
   * Creates Task object
   * @param {object} Task object
   * @param {string} The ID of the Board which task belongs to
   */
  constructor(task, boardId) {
    this.id = uuidv4();
    this.title = task.title;
    this.order = task.order;
    this.description = task.description;
    this.userId = task.userId;
    this.boardId = boardId;
    this.columnId = task.columnId;
  }

  /**
   * Returns user version of Task object by hiding special properties
   * @param {object} Task object to make "response-ready"
   * @returns {object} Task object after hiding necessary properties
   */

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }

  /**
   * Updates Task object with new property(ies) passed inside object
   * @param {object} updated task property(ies)
   */

  updateTask(updatedTask) {
    this.title = updatedTask.title || this.title;
    this.order = updatedTask.order || this.order;
    this.description = updatedTask.description || this.description;
    this.userId = updatedTask.userId || this.userId;
    this.boardId = updatedTask.boardId || this.boardId;
    this.columnId = updatedTask.columnId || this.columnId;
  }
}

