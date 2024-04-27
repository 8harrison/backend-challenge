import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha Inválidos');
    }
    if (user.password === password) {
      return await this.createToken(username);
    }
    throw new UnauthorizedException('Usuário ou senha Inválidos');
  }

  async createToken(username: string) {
    return this.jwtService.sign(
      { username: username },
      {
        secret: process.env.SECRET,
        expiresIn: parseInt(process.env.EXPIRES),
      },
    );
  }
}
