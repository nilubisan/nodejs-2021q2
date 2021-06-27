import { Request, Response, NextFunction} from 'express';
import jwt, { Secret }  from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { WHITELIST_PATH } from '../common/constants';
dotenv.config({
    path: path.resolve(__dirname, '../../.env')
})

export const checkToken = (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.path)
    if(!WHITELIST_PATH.includes(req.path)) {
        const authHeader = req.get('Authorization');
        if(authHeader === undefined) {
            res.status(401).send('Authorization error');
        } else {
            const [schema, token] = authHeader?.split(' ');
            console.log(token);
            if(schema !== 'Bearer') res.status(401).send('Authorization error');
            try {
                 jwt.verify(<string>token, process.env['SECRET_KEY'] as Secret);
            } catch(e) {
                res.status(401).send('Authorization error');
            }
            return next();
        }
    } else {
        return next();
    }

}