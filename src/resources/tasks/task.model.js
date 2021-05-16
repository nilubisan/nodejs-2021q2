const { v4: uuidv4 } = require('uuid');

class Task {
  constructor(task, boardId) {
    this.id = uuidv4();
    this.title = task.title;
    this.order = task.order;
    this.description = task.description;
    this.userId = task.userId;
    this.boardId = boardId;
    this.columnId = task.columnId;
  }

  static validateTask(task) {
    if(!(task.title !== undefined && typeof task.title === 'string')) {
      console.log('title error');
      return false
    }

    if (!(task.order !== undefined && typeof task.order === 'number')){
      console.log('order error');
      return false
    }

    if (!(task.description !== undefined && typeof task.description === 'string')){
      console.log('description error');
      return false
    }

   if(!(task.userId !== undefined && (typeof task.userId === 'string' || task.userId === null))) {
      console.log('userID error');
      return false
    }
    if(!(task.boardId !== undefined && (typeof task.boardId === 'string' || task.boardId === null))){
      console.log('boardId error');
      return false
    }

    if(!(task.columnId !== undefined && (typeof task.columnId === 'string' || task.columnId === null))){
      console.log('columnId error');
      return false
    }
    return true;
  }

  static toResponse(task) {
    const {id, title, order, description, userId, boardId, columnId} = task;
    return {id, title, order, description, userId, boardId, columnId}
  }
}

module.exports = Task;
