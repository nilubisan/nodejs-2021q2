import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt.interface'
import { HttpStatus } from '@nestjs/common'
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(private usersService: UsersService, private readonly jwtService: JwtService){}

async validateUser(payload: JwtPayload): Promise<UserDto | null> {
    const user = await this.usersService.findByPayload(payload);
    if(!user) {
        throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  };

  async login(loginUserDto: LoginUserDto) {
      const user = await this.usersService.findByLogin(loginUserDto);
      const token = this._createToken(user);
      return {
          name: user.name,
          ...token
      }
  };

  private _createToken({name}: UserDto) {
      const user:JwtPayload = { name };
      const token = this.jwtService.sign(user);
      return {
          token
      }
  };

}
