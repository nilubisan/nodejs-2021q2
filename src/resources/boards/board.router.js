const router = require('express').Router();
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service')
const Task = require('../tasks/task.model')

router.route('/').get((req, res) => {
  res.type('application/json')
  const boards = boardsService.getAllBoards();
  
  res.status(200).json(boards);
});

router.route('/:id').get((req, res) => {
  const board = boardsService.getBoardById(req.params.id)
  if(board) {
    res.type('application/json')
    res.json(board);
  }
  else res.status(404).send("Board not found");
});

router.route('/').post((req, res) => {
  res.type('application/json');
  const board = boardsService.createBoard(req.body);
  if(!board) res.status(400).send('Bad request');
  else {
    res.status(201).json(board);
  }
})

router.route('/:id').put((req,res) => {
  res.type('application/json')
  const board = boardsService.updateBoard(req.params.id, req.body)
  if(!board) res.status(400).send('Bad request');
  else {
    res.status(200).json(board);
  }
})

router.route('/:boardId').delete((req,res) => {
  const deletedBoard = boardsService.deleteBoard(req.params.boardId);
  if(deletedBoard) res.status(204).send("Board has been deleted");
  else res.status(404).send("Board not found");
})

router.route('/:boardId/tasks').get((req,res) => {
  res.type('application/json');
  const tasks = tasksService.getTasksByBoardId(req.params.boardId);
  if(tasks.length === 0) res.status(404).send("Tasks not found")
  else {
    res.status(200).json(tasks);
  } 
})

router.route('/:boardId/tasks').post((req,res) => {
  res.type('application/json')
  const task = tasksService.createTask(req.body, req.params.boardId);
  if(!task) {
    res.status(400).send('Bad request');
  }
  else {
    res.status(201).json(task);
  }
})

router.route('/:boardId/tasks/:taskId').get((req,res) => {
  const task = tasksService.getTask(req.params.boardId, req.params.taskId);
  if(!task) {
    res.status(404).send('Bad request');
  }
  else {
    res.type('application/json');
    res.status(200).send(Task.toResponse(task))
  }
})

router.route('/:boardId/tasks/:taskId').put((req,res) => {
  res.type('application/json')
  const task = tasksService.updateTask(req.body, req.params.boardId, req.params.taskId);
  if(!task){
    res.status(400).send('Bad request');
  } 
  else {
    res.type('application/json')
    res.status(200).json(Task.toResponse(task))
  }
})

router.route('/:boardId/tasks/:taskId').delete((req,res) => {
  const result = tasksService.deleteTask(req.params.boardId, req.params.taskId);
  if(!result) {
    res.status(404).send('Task not found');
  }
  else {
    res.status(204).send('Task has been deleted');
  }
})

module.exports = router;
