const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get((req, res) => {
  const boards = boardsService.getAllBoards();
  res.status(200).json(boards);
});

router.route('/:id').get((req, res) => {
  const board = boardsService.getBoardById(req.params.id)
  if(board) res.json(board);
  else res.status(404).send("Board not found");
});

router.route('/').post((req, res) => {
  res.type('application/json');
  const board = boardsService.createBoard(req.body);
  if(!board) res.status(400).send('Bad request');
  res.status(201).json(board);
})

router.route('/:id').put((req,res) => {
  res.type('application/json')
  const board = boardsService.updateBoard(req.params.id, req.body)
  if(!board) res.status(400).send('Bad request');
  res.status(200).json(board);
})

router.route('/:id').delete((req,res) => {
  res.type('application/json');
  const deletedBoard = boardsService.deleteBoard(req.params.id);
  if(deletedBoard) res.status(204).send("Board has been deleted");
  else res.status(404).send("Board not found");
})

module.exports = router;
