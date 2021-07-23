import { ConnectionOptions } from "typeorm"
import { UserEntity } from "src/users/entities/user.entity";
import { BoardEntity } from "src/boards/entities/board.entity";
import { TaskEntity } from "src/tasks/entities/task.entity";
import { join } from "path";


const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: +process.env['DB_PORT'],
  username: process?.env?.['DB_USERNAME'],
  password: process?.env?.['DB_PASSWORD'],
  database: process?.env?.['DB_NAME'],
  entities: [
    UserEntity,
    BoardEntity,
    TaskEntity
  ],
  migrationsRun: false,
  migrations: [
    join(__dirname, '/migrations/*{.ts,.js}')
  ],
  cli: {
    "migrationsDir":'./src/database/migrations'
  },
  
  synchronize: false,
};

export = config