"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unassignUser = exports.deleteTaskService = exports.updateTaskService = exports.getTaskService = exports.createTaskService = exports.getTasksByBoardIdService = void 0;
const task_memory_repository_1 = require("./task.memory.repository");
const task_model_1 = require("./task.model");
/**
 * Get ALL tasks with specified Board ID from tasks repository
 * @param {string} The ID of the board which tasks are assigned to
 * @returns {Array} Array of tasks. If there are no tasks with specified Board ID in DB, the function will return empty array
 */
const getTasksByBoardIdService = async (boardId) => task_memory_repository_1.getTasksByBoardId(boardId);
exports.getTasksByBoardIdService = getTasksByBoardIdService;
/**
 * Passes task to task repository for adding to DB
 * @param {object} task object
 * @returns {object | boolean} created task object
 */
const createTaskService = async (task, boardId) => task_memory_repository_1.createTask(new task_model_1.Task(task, boardId));
exports.createTaskService = createTaskService;
/**
 * Passes Board ID and Task ID to Task repository to get task
 * @param {string} the ID of the board which task is assigned to
 * @param {string} the ID of the task to get
 * @returns {object | undefined} Task object with specified IDs. If there is no task in DB with specified IDs, the function will return undefined
 */
const getTaskService = async (boardId, taskId) => task_memory_repository_1.getTask(boardId, taskId);
exports.getTaskService = getTaskService;
/**
 * Passes Board ID and Task ID and new task property(ies) to Task repository to update task
 * @param {object} The object with new task property(ies)
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to update
 * @returns Board object with updated properties
 */
const updateTaskService = async (updatedTask, boardId, taskId) => task_memory_repository_1.updateTask(updatedTask, boardId, taskId);
exports.updateTaskService = updateTaskService;
/**
 * Passes Board ID and Task ID to Task repository for removing task from DB.
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to delete
 * @returns {boolean} If there is no Task object with specified IDs in DB, the function will return false. Otherwise, it will return true.
 */
const deleteTaskService = async (boardId, taskId) => task_memory_repository_1.deleteTask(boardId, taskId);
exports.deleteTaskService = deleteTaskService;
/**
 * Passes User ID to Task repository to unassign user from all tasks where the user takes part in
 * @param {string} User ID
 * @returns {undefined}
 */
const unassignUser = async (userId) => exports.unassignUser(userId);
exports.unassignUser = unassignUser;
