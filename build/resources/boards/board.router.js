"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRouter = void 0;
const express_1 = __importDefault(require("express"));
const board_service_1 = require("./board.service");
const task_service_1 = require("../tasks/task.service");
exports.boardRouter = express_1.default.Router();
exports.boardRouter.route('/').get(async (res) => {
    const boards = await board_service_1.getAllBoardsService();
    res.status(200).json(boards);
});
exports.boardRouter.route('/:id').get(async (req, res) => {
    const boardId = req.params['id'];
    const board = await board_service_1.getBoardByIdService(boardId);
    if (!board) {
        res.status(404).send('Board not found');
    }
    else
        res.status(200).json(board);
});
exports.boardRouter.route('/').post(async (req, res) => {
    const board = await board_service_1.createBoardService(req.body);
    if (!board)
        res.status(400).send('Bad request');
    else
        res.status(201).json(board);
});
exports.boardRouter.route('/:id').put(async (req, res) => {
    const boardId = req.params['id'];
    const board = await board_service_1.updateBoardService(boardId, req.body);
    if (!board)
        res.status(400).send('Bad request');
    else
        res.status(200).json(board);
});
exports.boardRouter.route('/:boardId').delete(async (req, res) => {
    const boardId = req.params['id'];
    const deletedBoard = await board_service_1.deleteBoardService(boardId);
    if (deletedBoard)
        res.status(204).send('Board has been deleted');
    else
        res.status(404).send('Board not found');
});
exports.boardRouter.route('/:boardId/tasks').get(async (req, res) => {
    const boardId = req.params['boardId'];
    const tasks = await task_service_1.getTasksByBoardIdService(boardId);
    res.status(200).json((await tasks).map((task) => task));
});
exports.boardRouter.route('/:boardId/tasks').post(async (req, res) => {
    const boardId = req.params['boardId'];
    const task = await task_service_1.createTaskService(req.body, boardId);
    if (!task) {
        res.status(400).send('Bad request');
    }
    else {
        res.status(201).json(task);
    }
});
exports.boardRouter.route('/:boardId/tasks/:taskId').get(async (req, res) => {
    const boardId = req.params['boardId'];
    const taskId = req.params['taskId'];
    const task = await task_service_1.getTaskService(boardId, taskId);
    if (!task) {
        res.status(404).send('Bad request');
    }
    else {
        res.status(200).send(task);
    }
});
exports.boardRouter.route('/:boardId/tasks/:taskId').put(async (req, res) => {
    const boardId = req.params['boardId'];
    const taskId = req.params['taskId'];
    const task = await task_service_1.updateTaskService(req.body, boardId, taskId);
    if (!task) {
        res.status(400).send('Bad request');
    }
    else {
        res.status(200).json(task);
    }
});
exports.boardRouter.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
    const boardId = req.params['boardId'];
    const taskId = req.params['taskId'];
    const result = await task_service_1.deleteTaskService(boardId, taskId);
    if (!result) {
        res.status(404).send('Task not found');
    }
    else {
        res.status(204).send('Task has been deleted');
    }
});
