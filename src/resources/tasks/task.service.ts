import { getTasksByBoardId, createTask, getTask, updateTask, deleteTask, unassignUser } from './task.memory.repository';
import { Task } from '../../entities/Task';

export const getTasksByBoardIdService = async (boardId: string): Promise<Array<Task> | 'NOT FOUND'> =>
  getTasksByBoardId(boardId);

export const createTaskService = async (task: Task): Promise<Task> =>
  createTask(task);

export const getTaskService = async (boardId: string, taskId: string):  Promise<Task | 'NOT FOUND'> => getTask(boardId, taskId);

export const updateTaskService = async (task: Task, boardId: string, taskId: string): Promise<Task | 'NOT FOUND'> =>
  updateTask(task, boardId, taskId);

export const deleteTaskService = async (boardId: string, taskId: string): Promise<'NOT FOUND' | 'DELETED'> =>
  deleteTask(boardId, taskId);

export const unassignUserService = async (userId: string): Promise<void> => unassignUser(userId);

