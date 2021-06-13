import { NextFunction, Request, Response } from 'express';
import { logger } from '../common/logger'
import { IUnhandledErr } from '../resources/interfaces/unhandled-err-interface';

export function unhandledErrLog(error: Error, _req: Request, res: Response, _next: NextFunction):void  {
    res.status(500).send(error.name);
    const errorLogData: IUnhandledErr = {
        level: "error",
        errorName: error.name,
        errorStack: error.stack,
        message: error.message
    }
    logger(errorLogData);
  }