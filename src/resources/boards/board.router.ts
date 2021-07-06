import express from 'express';
import { Request, Response } from 'express';
import {
  getAllBoardsService,
  getBoardByIdService,
  createBoardService,
  updateBoardService,
  deleteBoardService,
} from './board.service';
import {
  getTasksByBoardIdService,
  createTaskService,
  getTaskService,
  updateTaskService,
  deleteTaskService,
} from '../tasks/task.service';
import {
  ReasonPhrases,
  StatusCodes
} from 'http-status-codes';
export const boardRouter = express.Router({ mergeParams: true });

boardRouter.route('/').get(async (_req, res: Response) => {
  const boards = await getAllBoardsService();
  res.status(StatusCodes.OK).json(boards);
});

boardRouter.route('/:id').get(async (req: Request, res: Response) => {
  const boardId = req.params['id'] as string;
  const board = await getBoardByIdService(boardId);
  if (board === 'NOT FOUND') {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  } else res.status(StatusCodes.OK).json(board);
});

boardRouter.route('/').post(async (req: Request, res: Response) => {
  const board = await createBoardService(req.body);
  if (!board) res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  else res.status(StatusCodes.CREATED).json(board);
});

boardRouter.route('/:id').put(async (req: Request, res: Response) => {
  const boardId = req.params['id'] as string;
  const board = await updateBoardService(boardId, req.body);
  if (board === 'NOT FOUND') res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  else res.status(StatusCodes.OK).json(board);
});

boardRouter.route('/:boardId').delete(async (req: Request, res: Response) => {
  const boardId = req.params['boardId'] as string;
  const result = await deleteBoardService(boardId);
  if (result === 'DELETED')
    res.status(StatusCodes.NO_CONTENT).send(result);
  else {
    res.status(StatusCodes.NOT_FOUND).send(result);
  }
});

boardRouter.route('/:boardId/tasks').get(
  async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const result = await getTasksByBoardIdService(boardId);
    if (result === 'NOT FOUND') res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(result);
  }
);

boardRouter.route('/:boardId/tasks').post(
  async (req: Request, res: Response): Promise<void> => {
    const boardID = req.params['boardId'] as string;
    const task = await createTaskService(boardID, req.body);
    res.status(StatusCodes.CREATED).json(task);
  }
);

boardRouter.route('/:boardId/tasks/:taskId').get(
  async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const taskId = req.params['taskId'] as string;
    const result = await getTaskService(boardId, taskId);
    if (result === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).json(result);
    }
  }
);

boardRouter.route('/:boardId/tasks/:taskId').put(
  async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const taskId = req.params['taskId'] as string;
    const result = await updateTaskService(req.body, boardId, taskId);
    if (result === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).json(result);
    }
  }
);

boardRouter.route('/:boardId/tasks/:taskId').delete(
  async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const taskId = req.params['taskId'] as string;
    const result = await deleteTaskService(boardId, taskId);
    if (result === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).send(result);
    } else {
      res.status(StatusCodes.NO_CONTENT).send(result);
    }
  }
);
