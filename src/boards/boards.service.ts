import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardRepository } from './boards.storage';

@Injectable()
export class BoardsService {
  constructor(private storage: BoardRepository){}
  async create(createBoardDto: CreateBoardDto) {
    return await this.storage.createBoard(createBoardDto)
  }

  async findAll() {
    return await this.storage.getAllBoards()
  }

  async findOne(id: string) {
    return await this.storage.getBoardById(id);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    return await this.storage.updateBoard(id, updateBoardDto)
  }

  async remove(id: string) {
    return await this.storage.deleteBoard(id)
  }
}
