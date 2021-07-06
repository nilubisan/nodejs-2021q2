import { Routes } from 'nest-router'
import { BoardsModule } from './boards/boards.module'
import { TasksModule } from './tasks/tasks.module'
import { UsersModule } from './users/users.module'

export const routes:Routes = [
    {
        path: '/boards',
        module: BoardsModule,
        children: [
            {
                path: '/:boardId/tasks',
                module: TasksModule
            }
        ],
    },
    {
        path: '/users',
        module: UsersModule
    }
]