import { getTasksByBoardId, createTask, getTask, updateTask, deleteTask, unassignUser, deleteBoardsTasks } from './task.memory.repository';
import { Task } from '../../entities/Task';

export const getTasksByBoardIdService = async (boardId: string): Promise<Array<Task> | 'NOT FOUND'> =>
  await getTasksByBoardId(boardId);

export const createTaskService = async (boardID: string, task: Task): Promise<Task> => {
  task.boardId = boardID;
  return await createTask(task);
}
  
export const getTaskService = async (boardId: string, taskId: string):  Promise<Task | 'NOT FOUND'> => await getTask(boardId, taskId);

export const updateTaskService = async (task: Task, boardId: string, taskId: string): Promise<Task | 'NOT FOUND'> => 
  await updateTask(task, boardId, taskId);

export const deleteTaskService = async (boardId: string, taskId: string): Promise<'NOT FOUND' | 'DELETED'> =>
  await deleteTask(boardId, taskId);

export const unassignUserService = async (userId: string): Promise<void> => await unassignUser(userId);

export const deleteBoardsTasksService = async (deletedBoardID: string): Promise<void> => await deleteBoardsTasks(deletedBoardID);
