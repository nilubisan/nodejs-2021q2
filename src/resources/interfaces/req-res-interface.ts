import { Request, Response } from 'express';

export interface IReqRes {
    level: string
    reqUrl: Request["originalUrl"],
    reqBody?: Request["body"],
    reqParams: Request["params"] | string,
    reqQuery?: Request["query"] | string,
    resStatus: Response['statusCode'],
    message: string,
}