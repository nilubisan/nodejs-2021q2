const router = require('express').Router();
const tasksService = require('./task.service')
const Task = require('./task.model')

router.route('/').get((req,res) => {
    const tasks = tasksService.getTasksByBoardId(req.params.boardId);
    if(tasks.length === 0) res.status(404).send("Tasks not found")
    else {
      res.type('application/json');
      res.status(200).json(tasks);
    } 
  })
  
  router.route('/').post((req,res) => {
  
    const task = tasksService.createTask(req.body, req.params.boardId);
    if(!task) {
      res.status(400).send('Bad request');
    }
    else {
      res.type('application/json')
      res.status(201).json(task);
    }
  })
  
  router.route('/:taskId').get((req,res) => {
    const task = tasksService.getTask(req.params.boardId, req.params.taskId);
    if(!task) {
      res.status(404).send('Bad request');
    }
    else {
      res.type('application/json');
      res.status(200).send(Task.toResponse(task))
    }
  })
  
  router.route('/:taskId').put((req,res) => {
    const task = tasksService.updateTask(req.body, req.params.boardId, req.params.taskId);
    if(!task){
      res.status(400).send('Bad request');
    } 
    else {
      res.type('application/json')
      res.status(200).json(Task.toResponse(task))
    }
  })
  
  router.route('/:taskId').delete((req,res) => {
    const result = tasksService.deleteTask(req.params.boardId, req.params.taskId);
    if(!result) {
      res.status(404).send('Task not found');
    }
    else {
      res.status(204).send('Task has been deleted');
    }
  })

  module.exports = router;