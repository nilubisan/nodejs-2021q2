import winston from 'winston';
import { IReqRes } from '../resources/interfaces/req-res-interface';
import { IUException } from '../resources/interfaces/u-exception-interface';
import { IUnhandledErr } from '../resources/interfaces/unhandled-err-interface';

export function logger(logData: IReqRes | IUnhandledErr | IUException): void {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({filename: './LOG-DATA.log'})
        ]
    });
    logger.log(logData);
}