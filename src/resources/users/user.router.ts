import express from 'express';
import { Request, Response } from 'express'
import { User } from './user.model';
import { getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService } from './user.service'
export const userRouter = express.Router();

userRouter.route('/').get(async (_req, res: Response) => {
  const users = await getAllUsersService();
  res.status(200).json(users.map(User.toResponse));
});

userRouter.route('/:id').get(async (req: Request, res: Response) => {
  const userId = req.params['id'] as string;
  const user = await getUserByIdService(userId);
  if (user) {
    const validUser = user as User;
    res.json(User.toResponse(validUser));
  } else res.status(404).send('User not found');
});

userRouter.route('/').post(async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  if (!user) res.status(400).send('Bad request');
  else {
    const validUser = user as User;
    res.status(201).json(User.toResponse(validUser));
  }
});

userRouter.route('/:id').put(async (req: Request, res: Response) => {
  const userId = req.params['id'] as string;
  const user = await updateUserService(userId, req.body);
  if (!user) res.status(400).send('Bad request');
  else {
    const validUser = user as User;
    res.status(200).json(User.toResponse(validUser));
  }
});

userRouter.route('/:id').delete(async (req: Request, res: Response) => {
  const userId = req.params['id'] as string;
  const deletedUser = await deleteUserService(userId);
  if(deletedUser === true) res.status(204).send('User has been deleted');
  else res.status(404).send('User not found');
});

