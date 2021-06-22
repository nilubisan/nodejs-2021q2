import { Task } from '../../entities/Task'
import { getRepository } from 'typeorm';

export const getTasksByBoardId = async (taskBoardID: string): Promise<Array<Task> | 'NOT FOUND'> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ where: { boardID: taskBoardID}});
  if(tasks === undefined) return 'NOT FOUND'
  return tasks;
}

export const createTask = async (task: Task): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const newTask = taskRepository.create(task);
  const savedTask = taskRepository.save(newTask);
  return savedTask;
};

export const getTask = async (boardID: string, taskID: string): Promise<Task | 'NOT FOUND'> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({ where: 
    [
      {boardID: boardID},
      {id: taskID}
    ]
  })
  if(task === undefined) return 'NOT FOUND';
  return task;
};

export const updateTask = async (task: Task, boardID: string, taskID: string): Promise<Task | 'NOT FOUND'> => {
  const taskRepository = getRepository(Task);
  const taskToUpdate = taskRepository.findOne({ where: 
    [
      {boardID: boardID},
      {id: taskID}
    ]
  })
  if(taskToUpdate === undefined) return 'NOT FOUND';
  const updatedTask = await taskRepository.update(taskID, task);
  return updatedTask.raw;
};

export const deleteTask = async (__boardID: string, taskID: string): Promise<'NOT FOUND' | 'DELETED'> => {
  const taskRepository = getRepository(Task);
  const deletionRes = await taskRepository.delete(taskID);
  if (deletionRes.affected) return 'DELETED';
  return 'NOT FOUND'
};

export const unassignUser = async (deletedUserID: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  taskRepository.update({ userID: deletedUserID}, { userID: null})
}
