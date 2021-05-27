const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get( async (req, res) => {
  const boards = await boardsService.getAllBoards();
  res.status(200).json(boards);
});

router.route('/:id').get( async (req, res) => {
  const board = await boardsService.getBoardById(req.params.id);
  if(!board) {
    res.status(404).send("Board not found");
  }
  else res.status(200).json(board);
});

router.route('/').post( async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  if(!board) res.status(400).send('Bad request');
  else res.status(201).json(board);
})

router.route('/:id').put( async (req,res) => {
  const board = await boardsService.updateBoard(req.params.id, req.body);
  if(!board) res.status(400).send('Bad request');
  else res.status(200).json(board);
})

router.route('/:boardId').delete((req,res) => {
  const deletedBoard = boardsService.deleteBoard(req.params.boardId);
  if(deletedBoard) res.status(204).send("Board has been deleted");
  else res.status(404).send("Board not found");
})

module.exports = router;
