const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getTasksByBoardId = async (boardId) =>
  tasksRepo.getTasksByBoardId(boardId);

const createTask = async (task, boardId) =>
  tasksRepo.createTask(new Task(task, boardId));

const getTask = async (boardId, taskId) => tasksRepo.getTask(boardId, taskId);

const updateTask = async (updatedTask, boardId, taskId) =>
  tasksRepo.updateTask(updatedTask, boardId, taskId);

const deleteTask = async (boardId, taskId) =>
  tasksRepo.deleteTask(boardId, taskId);

const unassignUser = async (userId) => tasksRepo.unassignUser(userId);

module.exports = {
  getTasksByBoardId,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  unassignUser,
};
