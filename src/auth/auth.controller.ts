import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    public async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto)
    }
}
