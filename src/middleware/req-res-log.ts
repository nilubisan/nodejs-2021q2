import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export function reqResLog(req: Request, res:Response, next: NextFunction):void {
    const reqUrl = req.originalUrl + ' ';
    const reqBody = Object.values(req.body).length === 0 ? '' : JSON.stringify(req.body) + ' ';
    const reqParams = Object.values(req.params).length === 0 ? '' : JSON.stringify(req.params) + ' ';
    const reqQuery = Object.values(req.query).length === 0 ? '' : JSON.stringify(req.query) + ' ';
    const resStatus = res.statusCode + ' ';
    const logMessage = Object.values({ reqUrl, reqParams, reqQuery, reqBody, resStatus }).join('') + '\r\n';
    fs.writeFile('./incoming-req-res.log', logMessage, {flag: 'a'}, (err) => {
      if(err !== null) console.error(err);
    })
    next();
  }