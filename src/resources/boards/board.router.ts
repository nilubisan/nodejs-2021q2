import express from 'express';
import { Request, Response } from 'express';
import { Task } from '../tasks/task.model';
import { getAllBoardsService, getBoardByIdService, createBoardService, updateBoardService, deleteBoardService } from './board.service';
import { getTasksByBoardIdService, createTaskService, getTaskService, updateTaskService, deleteTaskService } from '../tasks/task.service';
import { Board } from './board.model';
export const boardRouter = express.Router();

boardRouter.route('/').get(async (_req, res: Response) => {
  const boards: Board[] = await getAllBoardsService()
  res.status(200).json(boards);
});

boardRouter.route('/:id').get(async (req: Request, res: Response) => {
  const boardId = req.params['id'] as string;
  const board  = await getBoardByIdService(boardId);
  if (!board) {
    res.status(404).send('Board not found');
  } else res.status(200).json(board);
});

boardRouter.route('/').post(async (req: Request, res: Response) => {
  const board = await createBoardService(req.body);
  if (!board) res.status(400).send('Bad request');
  else res.status(201).json(board);
});

boardRouter.route('/:id').put(async (req: Request, res: Response) => {
  const boardId = req.params['id'] as string;
  const board = await updateBoardService(boardId, req.body);
  if (!board) res.status(400).send('Bad request');
  else res.status(200).json(board);
});

boardRouter.route('/:boardId').delete(async (req: Request, res: Response) => {
  const boardId = req.params['id'] as string
  const deletedBoard:Board|boolean = await deleteBoardService(boardId);
  if (deletedBoard) res.status(204).send('Board has been deleted');
  else res.status(404).send('Board not found');
});

boardRouter.route('/:boardId/tasks').get(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;
  const tasks: Task[]|[] = await getTasksByBoardIdService(boardId);
  res.status(200).json((await tasks).map((task: Task) => task));
});

boardRouter.route('/:boardId/tasks').post(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;
  const task: Task = await createTaskService(req.body, boardId);
  if (!task) {
    res.status(400).send('Bad request');
  } else {
    res.status(201).json(task);
  }
});

boardRouter.route('/:boardId/tasks/:taskId').get(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;
  const taskId = req.params['taskId'] as string;
  const task: Task | boolean = await getTaskService(
    boardId,
    taskId
  );
  if (!task) {
    res.status(404).send('Bad request');
  } else {
    res.status(200).send(task);
  }
});

boardRouter.route('/:boardId/tasks/:taskId').put(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;
  const taskId = req.params['taskId'] as string;
  const task: Task | boolean = await updateTaskService(
    req.body,
    boardId,
    taskId
  );
  if (!task) {
    res.status(400).send('Bad request');
  } else {
    res.status(200).json(task);
  }
});

boardRouter.route('/:boardId/tasks/:taskId').delete(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;
  const taskId = req.params['taskId'] as string;
  const result: boolean = await deleteTaskService(
    boardId,
    taskId
  );
  if (!result) {
    res.status(404).send('Task not found');
  } else {
    res.status(204).send('Task has been deleted');
  }
});

