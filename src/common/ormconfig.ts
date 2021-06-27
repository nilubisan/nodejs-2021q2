import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const connectionConfig = {
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: process?.env?.['DB_PORT'],
  username: process?.env?.['DB_USERNAME'],
  password: process?.env?.['DB_PASSWORD'],
  database: process?.env?.['DB_NAME'],
  entities: [path.join(__dirname, '../entities/*.ts')],
  synchronize: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
} as ConnectionOptions;
