import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';
import { Request, Response, NextFunction } from 'express';
import { reqResHandler } from './middleware/req-res-handler';
import { unhandledErrLog } from './middleware/unhandled-err-log';
import { logger } from './common/logger'
import { IUException } from './resources/interfaces/u-exception-interface';
import { IURejection } from './resources/interfaces/u-rejection-interface';
export const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(reqResHandler);

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});


app.use('/users', userRouter);
app.use('/boards', boardRouter);


app.use(unhandledErrLog);

process.on("uncaughtException", (err: Error, origin: string) => {
  const uExceptionLogMessage: IUException = {
    level: "error",
    name: "uncaughtException",
    origin: origin,
    stack: err.stack,
    message: err.message,
  }
  logger(uExceptionLogMessage);
  process.exitCode = 1;
})

process.on("unhandledRejection", (err: Error, rejectPromise: Promise<never>) => {
  const uRejectionLogMessage: IURejection = {
    level: "error",
    name: "unhandledRejection",
    message: err["message"],
    stack: err.stack
  }
  logger(uRejectionLogMessage);
  console.error(rejectPromise)
})
