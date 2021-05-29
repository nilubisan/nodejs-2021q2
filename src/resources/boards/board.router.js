const router = require('express').Router();
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
const Task = require('../tasks/task.model');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  res.status(200).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.id);
  if (!board) {
    res.status(404).send('Board not found');
  } else res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  if (!board) res.status(400).send('Bad request');
  else res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.updateBoard(req.params.id, req.body);
  if (!board) res.status(400).send('Bad request');
  else res.status(200).json(board);
});

router.route('/:boardId').delete((req, res) => {
  const deletedBoard = boardsService.deleteBoard(req.params.boardId);
  if (deletedBoard) res.status(204).send('Board has been deleted');
  else res.status(404).send('Board not found');
});

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getTasksByBoardId(req.params.boardId);
  res.status(200).json(tasks.map((task) => Task.toResponse(task)));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await tasksService.createTask(req.body, req.params.boardId);
  if (!task) {
    res.status(400).send('Bad request');
  } else {
    res.status(201).json(Task.toResponse(task));
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await tasksService.getTask(
    req.params.boardId,
    req.params.taskId
  );
  if (!task) {
    res.status(404).send('Bad request');
  } else {
    res.status(200).send(Task.toResponse(task));
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await tasksService.updateTask(
    req.body,
    req.params.boardId,
    req.params.taskId
  );
  if (!task) {
    res.status(400).send('Bad request');
  } else {
    res.status(200).json(Task.toResponse(task));
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const result = await tasksService.deleteTask(
    req.params.boardId,
    req.params.taskId
  );
  if (!result) {
    res.status(404).send('Task not found');
  } else {
    res.status(204).send('Task has been deleted');
  }
});

module.exports = router;
