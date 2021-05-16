const boards = []

const getAllBoards = () => 
   boards
;

const getBoardById = (boardId) => boards.find((board) => board.id === boardId)


const createBoard = (board) => {
  boards.push(board)
  return board;
}

const updateBoard = (boardId, updatedBoardData) => {
  const ind = boards.findIndex((board) => board.id === boardId);
  boards[ind] = updatedBoardData;
  boards[ind].id = boardId
  return boards[ind];
}

const deleteBoard = (boardId) => {
  const ind = boards.findIndex((board) => board.id === boardId);
  if(ind === -1) return false;
  const deletedBoard = boards.splice(ind, 1);
  return deletedBoard[0]
}
module.exports = { getAllBoards, createBoard, getBoardById, updateBoard, deleteBoard };
