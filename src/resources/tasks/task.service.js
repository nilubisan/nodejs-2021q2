const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getTasksByBoardId = (boardId) => tasksRepo.getTasksByBoardId(boardId);
const createTask = (task, boardId) => (Task.validateTask(task)) ? tasksRepo.createTask(new Task(task, boardId)) : false
const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);
const updateTask = (updatedTask, boardId, taskId) => (Task.validateTask(updatedTask)) ? tasksRepo.updateTask((new Task(updatedTask, boardId)), boardId, taskId) : false 
const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);
module.exports = { getTasksByBoardId, createTask, getTask, updateTask, deleteTask };
