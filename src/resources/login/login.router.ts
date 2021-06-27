import { Request, Response } from 'express';
import express from 'express';
import { signToken } from './login.service';
export const loginRouter = express.Router();

loginRouter.route('/').post(async (req: Request, res: Response) => {
  const login: string = req.body.login;
  const password: string = req.body.password;
  const token = await signToken(login, password);
  if (!token) res.status(403).send('Wrong login/password combination');
  else res.status(200).json({ token: token });
});
