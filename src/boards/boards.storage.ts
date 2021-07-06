import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { BoardEntity } from "./entities/board.entity";
import { EntityRepository, Repository } from "typeorm";
import * as dotenv from 'dotenv'
dotenv.config();

@Injectable()
@EntityRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {
    async getAllBoards(): Promise<Array<BoardEntity>> {
        return await this.find({});
      };
      
      async getBoardById(boardId: string): Promise<BoardEntity | 'NOT FOUND'> {
        const board = await this.findOne(boardId);
        if (board === undefined) return 'NOT FOUND';
        return board;
      };
      
        async createBoard(board: CreateBoardDto): Promise<BoardEntity> {

        const newBoard = await this.create(board);
        const savedBoard = await this.save(newBoard);
        console.log(savedBoard)
        return savedBoard;
      };
      
        async updateBoard(boardId: string, board: UpdateBoardDto): Promise<BoardEntity | 'NOT FOUND'> {
        const boardToUpdate = await this.findOne(boardId);
        if (boardToUpdate === undefined) return 'NOT FOUND';
        const updatedBoard = await this.update(boardId, board);
        return updatedBoard.raw;
      };
      
      async deleteBoard (boardId: string): Promise<'NOT FOUND' | 'DELETED'> {
        const deletionRes = await this.delete(boardId);
        if (deletionRes.affected) return 'DELETED';
        return 'NOT FOUND';
      };
}
