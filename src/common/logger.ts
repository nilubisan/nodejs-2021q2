import winston from 'winston';
import { IReqRes } from '../resources/interfaces/req-res-interface';
import { IUException } from '../resources/interfaces/u-exception-interface';
import { IURejection } from '../resources/interfaces/u-rejection-interface';
import { IUnhandledErr } from '../resources/interfaces/unhandled-err-interface';

export function logger(logData: IReqRes | IUnhandledErr | IUException | IURejection): void {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({filename: './LOG-DATA.log'})
        ]
    });
    logger.log(logData);
}