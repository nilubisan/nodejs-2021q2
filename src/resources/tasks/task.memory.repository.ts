import { Task, ITaskUpdated } from './task.model';

/**
 * Simulation of Tasks DB {Array}
 */
const TASKS: Array<Task> = [];

/**
 * Returns ALL tasks with specified Board ID from Tasks DB
 * @param {string} The ID of the board which tasks are assigned to
 * @returns {Array} Array of tasks. If there are no tasks with specified Board ID in DB, the function will return empty array
 */
export const getTasksByBoardId = async (boardId: string): Promise<Array<Task> | []> => 
  TASKS.filter((task) => task.boardId === boardId);

/**
 * Creates new task and adds it to Tasks DB
 * @param {object} a Task object
 * @returns {object} created task
 */

export const createTask = async (task: Task): Promise<Task> => {
  TASKS.push(task);
  return task;
};

/**
 * Returns task with specified Board ID and Task ID from Tasks DB
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to get
 * @returns {object | undefined} Task object with specified Board ID and Task ID. If there is no such task in DB, the function will return undefined
 */

export const getTask = async (boardId: string, taskId: string): Promise<Task | boolean> => {
  const selectedBoardTasks = await getTasksByBoardId(boardId);
  const task = selectedBoardTasks.find((task) => task.id === taskId);
  return task === undefined ? false : task;
};

/**
 * Updates the task with specified Board ID and Task ID in Tasks DB
 * @param {object} The object with new task property(ies)
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to update
 * @returns {object} Task object with updated properties
 */

export const updateTask = async (updatedTask: ITaskUpdated, boardId: string, taskId: string): Promise<Task | boolean> => {
  const selectedTask = TASKS.find(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (!selectedTask) return false;
  selectedTask.updateTask(updatedTask);
  return selectedTask;
};

/**
 * Deletes the task with specified Board ID and Task ID from Tasks DB
 * @param {string} The ID of the board which task is assigned to
 * @param {string} The ID of the task to delete
 * @returns {boolean} If there is no Task object with specified IDs in DB, the function will return false. Otherwise, it will return true.
 */

export const deleteTask = async (boardId: string, taskId: string): Promise<boolean> => {
  const ind = TASKS.findIndex(
    (task) => task.id === taskId && task.boardId === boardId
  );
  if (ind === -1) return false;
  TASKS.splice(ind, 1);
  return true;
};

/**
 * Unassign user from all tasks where the user takes part in
 * @param {string} The ID of the user unassign to
 * @returns {undefined}
 */

export const unassignUser = async (userId: string): Promise<void> => 
  TASKS.forEach((task) => task.userId = (task.userId === userId ? null : task.userId))


module.exports = {
  createTask,
  getTasksByBoardId,
  getTask,
  updateTask,
  deleteTask,
  unassignUser,
};
