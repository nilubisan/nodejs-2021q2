import { Request, Response } from 'express';
import express from 'express';
import { signToken } from './login.service';
export const loginRouter = express.Router();
import {
  ReasonPhrases,
  StatusCodes
} from 'http-status-codes';

loginRouter.route('/').post(async (req: Request, res: Response) => {
  const login: string = req.body.login;
  const password: string = req.body.password;
  const token = await signToken(login, password);
  if (!token) res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
  else res.status(StatusCodes.OK).json({ token: token });
});
