import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, username: user.username };

    return {
      token: this.jwtService.sign(payload),
      username: user.username,
      id: user.id,
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    return user;
  }
}
