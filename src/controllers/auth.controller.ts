import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../dto/auth.login.dto';
import { UserService } from '../services/user.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('auth/login')
  async login(@Body() user: UserDto) {
    return this.authService.validateUser(user.username, user.password);
  }

  @Post('auth/register')
  async register(@Body() user: UserDto) {
    return await this.userService.create(user);
  }
}
