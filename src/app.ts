import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';
import { Request, Response, NextFunction } from 'express';
import { reqResHandler } from './middleware/req-res-handler';
import { unhandledErrLog } from './middleware/unhandled-err-log';
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
