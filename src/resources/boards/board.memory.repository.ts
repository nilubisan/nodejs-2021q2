import { Board } from '../../entities/Board';
import { getRepository } from 'typeorm';

export const getAllBoards = async (): Promise<Array<Board>> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find({ where: {} });
};

export const getBoardById = async (
  boardId: string
): Promise<Board | 'NOT FOUND'> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(boardId);
  if (board === undefined) return 'NOT FOUND';
  return board;
};

export const createBoard = async (board: Board): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const newBoard = boardRepository.create(board);
  const savedBoard = boardRepository.save(newBoard);
  return savedBoard;
};

export const updateBoard = async (
  boardId: string,
  board: Board
): Promise<Board | 'NOT FOUND'> => {
  const boardRepository = getRepository(Board);
  const boardToUpdate = await boardRepository.findOne(boardId);
  if (boardToUpdate === undefined) return 'NOT FOUND';
  const updatedBoard = await boardRepository.update(boardId, board);
  return updatedBoard.raw;
};

export const deleteBoard = async (
  boardId: string
): Promise<'NOT FOUND' | 'DELETED'> => {
  const boardRepository = getRepository(Board);
  const deletionRes = await boardRepository.delete(boardId);
  if (deletionRes.affected) return 'DELETED';
  return 'NOT FOUND';
};
