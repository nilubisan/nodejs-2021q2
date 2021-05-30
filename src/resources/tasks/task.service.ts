const tasksRepo = require('./task.memory.repository');
import { Task } from './task.model';

/**
 * Get ALL tasks with specified Board ID from tasks repository
 * @param {string} The ID of the board which tasks are assigned to
 * @returns {Array} Array of tasks. If there are no tasks with specified Board ID in DB, the function will return empty array
 */
export const getTasksByBoardIdService = async (boardId) =>
  tasksRepo.getTasksByBoardId(boardId);

/**
 * Passes task to task repository for adding to DB
 * @param {object} task object
 * @returns {object | boolean} created task object
 */

export const createTaskService = async (task, boardId) =>
  tasksRepo.createTask(new Task(task, boardId));

/**
 * Passes Board ID and Task ID to Task repository to get task
 * @param {string} the ID of the board which task is assigned to
 * @param {string} the ID of the task to get
 * @returns {object | undefined} Task object with specified IDs. If there is no task in DB with specified IDs, the function will return undefined
 */

export const getTaskService = async (boardId, taskId) => tasksRepo.getTask(boardId, taskId);

/**
 * Passes Board ID and Task ID and new task property(ies) to Task repository to update task
 * @param {object} The object with new task property(ies)
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to update
 * @returns Board object with updated properties
 */

export const updateTaskService = async (updatedTask, boardId, taskId) =>
  tasksRepo.updateTask(updatedTask, boardId, taskId);

/**
 * Passes Board ID and Task ID to Task repository for removing task from DB.
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to delete
 * @returns {boolean} If there is no Task object with specified IDs in DB, the function will return false. Otherwise, it will return true.
 */
export const deleteTaskService = async (boardId, taskId) =>
  tasksRepo.deleteTask(boardId, taskId);

/**
 * Passes User ID to Task repository to unassign user from all tasks where the user takes part in
 * @param {string} User ID
 * @returns {undefined}
 */
const unassignUser = async (userId) => tasksRepo.unassignUser(userId);

