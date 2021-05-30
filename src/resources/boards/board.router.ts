import express from 'express';
import { Request, Response } from 'express';
import { Task } from '../tasks/task.model';
import { getAllBoardsService, getBoardByIdService, createBoardService, updateBoardService, deleteBoardService } from './board.service';
import { getTasksByBoardIdService, createTaskService, getTaskService, updateTaskService, deleteTaskService } from '../tasks/task.service';
import { Board } from './board.model';
export const boardRouter = express.Router();

boardRouter.route('/').get(async (res: Response) => {
  const boards: Promise<Board> = await getAllBoardsService()
  .then(() => {
    res.status(200).json(boards);
  })
});

boardRouter.route('/:id').get(async (req: Request, res: Response) => {
  const board: Board = await getBoardByIdService(req.params['id']);
  if (!board) {
    res.status(404).send('Board not found');
  } else res.status(200).json(board);
});

boardRouter.route('/').post(async (req: Request, res: Response): Promise<void> => {
  const board: Board = await createBoardService(req.body);
  if (!board) res.status(400).send('Bad request');
  else res.status(201).json(board);
});

boardRouter.route('/:id').put(async (req: Request, res: Response): Promise<void> => {
  const board: Board = await updateBoardService(req.params['id'], req.body);
  if (!board) res.status(400).send('Bad request');
  else res.status(200).json(board);
});

boardRouter.route('/:boardId').delete(async (req: Request, res: Response): Promise<void> => {
  const deletedBoard:Promise<boolean> = await deleteBoardService(req.params['boardId']);
  if (deletedBoard) res.status(204).send('Board has been deleted');
  else res.status(404).send('Board not found');
});

boardRouter.route('/:boardId/tasks').get(async (req: Request, res: Response): Promise<void> => {
  const tasks: Promise<[Task]|[]> = await getTasksByBoardIdService(req.params['boardId']);
  res.status(200).json((await tasks).map((task: Task) => Task.toResponse(task)));
});

boardRouter.route('/:boardId/tasks').post(async (req: Request, res: Response): Promise<void> => {
  const task: Task = await createTaskService(req.body, req.params['boardId']);
  if (!task) {
    res.status(400).send('Bad request');
  } else {
    res.status(201).json(Task.toResponse(task));
  }
});

boardRouter.route('/:boardId/tasks/:taskId').get(async (req: Request, res: Response): Promise<void> => {
  const task: Task = await getTaskService(
    req.params['boardId'],
    req.params['taskId']
  );
  if (!task) {
    res.status(404).send('Bad request');
  } else {
    res.status(200).send(Task.toResponse(task));
  }
});

boardRouter.route('/:boardId/tasks/:taskId').put(async (req: Request, res: Response): Promise<void> => {
  const task: Task = await updateTaskService(
    req.body,
    req.params['boardId'],
    req.params['taskId']
  );
  if (!task) {
    res.status(400).send('Bad request');
  } else {
    res.status(200).json(Task.toResponse(task));
  }
});

boardRouter.route('/:boardId/tasks/:taskId').delete(async (req: Request, res: Response): Promise<void> => {
  const result: Promise<boolean> = await deleteTaskService(
    req.params['boardId'],
    req.params['taskId']
  );
  if (!result) {
    res.status(404).send('Task not found');
  } else {
    res.status(204).send('Task has been deleted');
  }
});

