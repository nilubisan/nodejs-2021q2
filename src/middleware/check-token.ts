import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { WHITELIST_PATH } from '../common/constants';
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});
import {
  ReasonPhrases,
  StatusCodes
} from 'http-status-codes';

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!WHITELIST_PATH.includes(req.path)) {
    const authHeader = req.get('Authorization');
    if (authHeader === undefined) {
      res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    } else {
      const [schema, token] = authHeader?.split(' ');
      if (schema !== 'Bearer') res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
      try {
        jwt.verify(<string>token, process.env['SECRET_KEY'] as Secret);
      } catch (e) {
        res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
      }
      return next();
    }
  } else {
    return next();
  }
};
