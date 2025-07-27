import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(LoginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(LoginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // TODO: Use bcrypt to compare passwords
    if (user.hashedPassword !== LoginDto.password) {
      throw new UnauthorizedException();
    }

    const { hashedPassword, ...result } = user;

    const payload = { sub: user.id, username: user.email };
    return {
      result,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(LoginDto: LoginDto) {
    const user = await this.validateUser(LoginDto);
    return user;
  }
}
