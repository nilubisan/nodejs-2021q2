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

  // static validateTask(task) {
  //   let isTaskValid;
  //   if((!task.title || typeof task.title !== 'string')
  //   ||
  //   (!task.order || typeof task.order !== 'number')
  //   ||
  //   (!task.description || typeof task.description !== 'string')
  //   ||
  //   (!task.userId || typeof task.userId !== 'string')
  //   ||
  //   (!task.boardId || typeof task.boardId !== 'string')
  //   ||
  //   (!task.columnId || typeof task.columnId !== 'string')
  //   ){
  //     isTaskValid = false;
  //   } else isTaskValid = true;
  //   return isTaskValid;
  // }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId }
  }

  updateTask(updatedTask) {
    this.title = updatedTask.title || this.title;
    this.order = updatedTask.order || this.order;
    this.description = updatedTask.description || this.description;
    this.userId = updatedTask.userId || this.userId;
    this.boardId = updatedTask.boardId || this.boardId;
    this.columnId = updatedTask.columnId || this.columnId;
  }
}

module.exports = Task;
