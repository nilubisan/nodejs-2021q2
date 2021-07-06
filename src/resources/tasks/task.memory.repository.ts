import { Task } from '../../entities/Task';
import { getRepository } from 'typeorm';

export const getTasksByBoardId = async (
  taskBoardID: string
): Promise<Array<Task> | 'NOT FOUND'> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ boardId: taskBoardID });
  if (tasks === undefined) return 'NOT FOUND';
  return tasks;
};

export const createTask = async (task: Task): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const newTask = await taskRepository.create(task);
  const savedTask = await taskRepository.save(newTask);
  return savedTask;
};

export const getTask = async (
  __boardID: string,
  taskID: string
): Promise<Task | 'NOT FOUND'> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(taskID);
  if (task === undefined) return 'NOT FOUND';
  return task;
};

export const updateTask = async (
  task: Task,
  __boardID: string,
  taskID: string
): Promise<Task | 'NOT FOUND'> => {
  const taskRepository = getRepository(Task);
  const updatedTask = await taskRepository.update(taskID, task);
  if (updatedTask.affected) return updatedTask.raw;
  return 'NOT FOUND';
};

export const deleteTask = async (
  __boardID: string,
  taskID: string
): Promise<'NOT FOUND' | 'DELETED'> => {
  const taskRepository = getRepository(Task);
  const deletionRes = await taskRepository.delete(taskID);
  if (deletionRes.affected) return 'DELETED';
  return 'NOT FOUND';
};

export const unassignUser = async (deletedUserID: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  await taskRepository.update({ userId: deletedUserID }, { userId: null });
};

export const deleteBoardsTasks = async (
  deletedBoardID: string
): Promise<void> => {
  const taskRepository = getRepository(Task);
  const tasksToDelete = await taskRepository.find({ boardId: deletedBoardID });
  await taskRepository.remove(tasksToDelete);
};
