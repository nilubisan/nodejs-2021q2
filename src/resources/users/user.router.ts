import express from 'express';
import { Request, Response } from 'express'
import { getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService } from './user.service'
export const userRouter = express.Router({ mergeParams : true });

userRouter.route('/').get(async (_req, res: Response) => {
  const users = await getAllUsersService();
  res.status(200).json(users);
});

userRouter.route('/:id').get(async (req: Request, res: Response) => {
  const userID = req.params['id'] as string;
  const result = await getUserByIdService(userID);
  if (result === 'NOT FOUND') res.status(404).send('User not found');
  res.status(200).json(result);
});

userRouter.route('/').post(async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  res.status(201).json(user);
});

userRouter.route('/:id').put(async (req: Request, res: Response) => {
  const userId = req.params['id'] as string;
  const user = await updateUserService(userId, req.body);
  res.status(200).json(user);
});

userRouter.route('/:id').delete(async (req: Request, res: Response) => {
  const userId = req.params['id'] as string;
  const deletionRes = await deleteUserService(userId);
  if(deletionRes === 'DELETED') res.status(204).send(deletionRes);
  else res.status(404).send(deletionRes);
});

