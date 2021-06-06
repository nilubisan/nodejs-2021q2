import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

export function unhandledErrLog(error: Error, _req: Request, res: Response, _next: NextFunction):void  {
    res.status(500).send(error.name);
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({filename: './error.log'})
        ]
    });
    logger.log({
      level: 'error',
      name: error.name,
      message: error.message,
      stack: error.stack
    })
  }