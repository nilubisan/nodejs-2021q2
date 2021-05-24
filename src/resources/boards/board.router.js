const router = require('express').Router();
const boardsService = require('./board.service');

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

  const board = boardsService.createBoard(req.body);
  if(!board) res.status(400).send('Bad request');
  else {
    res.type('application/json');
    res.status(201).json(board);
  }
})

router.route('/:id').put((req,res) => {

  const board = boardsService.updateBoard(req.params.id, req.body)
  if(!board) res.status(400).send('Bad request');
  else {
    res.type('application/json')
    res.status(200).json(board);
  }
})

router.route('/:boardId').delete((req,res) => {
  const deletedBoard = boardsService.deleteBoard(req.params.boardId);
  if(deletedBoard) res.status(204).send("Board has been deleted");
  else res.status(404).send("Board not found");
})

module.exports = router;
