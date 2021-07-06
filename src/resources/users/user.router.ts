import express from 'express';
import { Request, Response } from 'express';
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from './user.service';
export const userRouter = express.Router({ mergeParams: true });
import {
  ReasonPhrases,
  StatusCodes
} from 'http-status-codes';

userRouter.route('/').get(async (_req, res: Response) => {
  const users = await getAllUsersService();
  res.status(StatusCodes.OK).json(users);
});

userRouter.route('/:id').get(async (req: Request, res: Response) => {
  const userID = req.params['id'] as string;
  const result = await getUserByIdService(userID);
  if (result === 'NOT FOUND') res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  res.status(StatusCodes.OK).json(result);
});

userRouter.route('/').post(async (req: Request, res: Response) => {
  const result = await createUserService(req.body);
  res.status(StatusCodes.CREATED).json(result);
});

userRouter.route('/:id').put(async (req: Request, res: Response) => {
  const userId = req.params['id'] as string;
  const result = await updateUserService(userId, req.body);
  if(result === 'NOT FOUND') res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  res.status(StatusCodes.OK).json(result);
});

userRouter.route('/:id').delete(async (req: Request, res: Response) => {
  const userId = req.params['id'] as string;
  const result = await deleteUserService(userId);
  if (result === 'DELETED') res.status(StatusCodes.NO_CONTENT).send(result);
  else res.status(StatusCodes.NOT_FOUND).send(result);
});
