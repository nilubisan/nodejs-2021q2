const BOARDS = []

const getAllBoards = async () => BOARDS;

const getBoardById = async (boardId) => BOARDS.find((board) => board.id === boardId)

const createBoard = async (board) => {
  BOARDS.push(board);
  return board;
}

const updateBoard = async (boardId, updatedBoard) => {
  const ind = BOARDS.findIndex((board) => board.id === boardId);
  BOARDS[ind].updateBoard(updatedBoard);
  return BOARDS[ind];
}

const deleteBoard = async (boardId) => {
  const ind = BOARDS.findIndex((board) => board.id === boardId);
  if(ind === -1) return false;
  const deletedBoard = BOARDS.splice(ind, 1)[0];
  return deletedBoard;
}
module.exports = { getAllBoards, createBoard, getBoardById, updateBoard, deleteBoard };
