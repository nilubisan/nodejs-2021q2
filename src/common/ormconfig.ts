import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm'
dotenv.config();

export const connectionConfig = {
    type: "postgres",
    host: process.env['DB_HOST'],
    port: process?.env?.['DB_PORTS'],
    username: process?.env?.['DB_USERNAME'],
    password: process?.env?.['DB_PASSWORD'],
    database: process?.env?.['DB_NAME'],
    synchronize: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectionInterval: 1000
} as ConnectionOptions