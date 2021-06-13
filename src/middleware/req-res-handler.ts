import { Request, Response, NextFunction } from 'express';
import { IReqRes } from '../resources/interfaces/req-res-interface';
import { logger } from '../common/logger';

export function reqResHandler(req: Request, res:Response, next: NextFunction):void {
    const reqResLogMessage: IReqRes = {
      level: "info",
      reqUrl: req.originalUrl,
      reqBody: (req["method"] === "GET" ? "" : req.body),
      reqParams: (Object.values(req.params).length === 0 ? '' : req.params),
      reqQuery: (Object.values(req.query).length === 0 ? '' : req.query),
      resStatus: res.statusCode,
      message: "Request-response log data",
    }
    logger(reqResLogMessage);
    next();
  }