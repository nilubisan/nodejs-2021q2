"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unassignUser = exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getTasksByBoardId = void 0;
/**
 * Simulation of Tasks DB {Array}
 */
const TASKS = [];
/**
 * Returns ALL tasks with specified Board ID from Tasks DB
 * @param {string} The ID of the board which tasks are assigned to
 * @returns {Array} Array of tasks. If there are no tasks with specified Board ID in DB, the function will return empty array
 */
const getTasksByBoardId = async (boardId) => TASKS.filter((task) => task.boardId === boardId);
exports.getTasksByBoardId = getTasksByBoardId;
/**
 * Creates new task and adds it to Tasks DB
 * @param {object} a Task object
 * @returns {object} created task
 */
const createTask = async (task) => {
    TASKS.push(task);
    return task;
};
exports.createTask = createTask;
/**
 * Returns task with specified Board ID and Task ID from Tasks DB
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to get
 * @returns {object | undefined} Task object with specified Board ID and Task ID. If there is no such task in DB, the function will return undefined
 */
const getTask = async (boardId, taskId) => {
    const selectedBoardTasks = await exports.getTasksByBoardId(boardId);
    const task = selectedBoardTasks.find((task) => task.id === taskId);
    return task === undefined ? false : task;
};
exports.getTask = getTask;
/**
 * Updates the task with specified Board ID and Task ID in Tasks DB
 * @param {object} The object with new task property(ies)
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to update
 * @returns {object} Task object with updated properties
 */
const updateTask = async (updatedTask, boardId, taskId) => {
    const selectedTask = TASKS.find((task) => task.boardId === boardId && task.id === taskId);
    if (!selectedTask)
        return false;
    selectedTask.updateTask(updatedTask);
    return selectedTask;
};
exports.updateTask = updateTask;
/**
 * Deletes the task with specified Board ID and Task ID from Tasks DB
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to delete
 * @returns {boolean} If there is no Task object with specified IDs in DB, the function will return false. Otherwise, it will return true.
 */
const deleteTask = async (boardId, taskId) => {
    const ind = TASKS.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (ind === -1)
        return false;
    TASKS.splice(ind, 1);
    return true;
};
exports.deleteTask = deleteTask;
/**
 * Unassign user from all tasks where the user takes part in
 * @param {string} The ID of the user unassign to
 * @returns {undefined}
 */
const unassignUser = async (userId) => TASKS.forEach((task) => task.userId = (task.userId === userId ? null : task.userId));
exports.unassignUser = unassignUser;
module.exports = {
    createTask: exports.createTask,
    getTasksByBoardId: exports.getTasksByBoardId,
    getTask: exports.getTask,
    updateTask: exports.updateTask,
    deleteTask: exports.deleteTask,
    unassignUser: exports.unassignUser,
};
