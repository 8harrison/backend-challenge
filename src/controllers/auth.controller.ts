import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../dto/auth.login.dto';
import { UserService } from '../services/user.service';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResponse } from './customDecorator';
import { User } from 'src/entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('auth/login')
  @ApiResponse({
    status: 201,
    description: 'Autentica as credenciais de um usuário',
    type: LoginResponse,
  })
  async login(@Body() user: UserDto) {
    return {
      token: await this.authService.validateUser(user.username, user.password),
    };
  }

  @Post('auth/register')
  @ApiResponse({ status: 201, description: 'Registra um Usuário', type: User })
  async register(@Body() user: UserDto) {
    return await this.userService.create(user);
  }

  @Get()
  async hello() {
    return { message: 'Olá, Amigo a API está Funcionando' };
  }
}
