import {getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard} from './board.memory.repository';
import { deleteBoardsTasksService } from '../tasks/task.service';
import { Board } from '../../entities/Board'

export const getAllBoardsService = async (): Promise<Board[]> => getAllBoards();

export const getBoardByIdService = async (boardId: string): Promise<Board | 'NOT FOUND'> => getBoardById(boardId);

export const createBoardService = async (board: Board): Promise<Board> =>
  createBoard(board);

export const updateBoardService = async (boardId: string, board: Board): Promise<Board | 'NOT FOUND'> =>
updateBoard(boardId, board);

export const deleteBoardService = async (boardId: string): Promise<'NOT FOUND' | 'DELETED'> => {
  const deletionRes = await deleteBoard(boardId);
  if (deletionRes === 'DELETED') {
    await deleteBoardsTasksService(boardId);
  }
  return deletionRes;
};

