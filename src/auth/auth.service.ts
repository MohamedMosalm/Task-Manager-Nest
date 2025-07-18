import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signIn(LoginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(LoginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // TODO: Use bcrypt to compare passwords
    if (user.hashedPassword !== LoginDto.password) {
      throw new UnauthorizedException();
    }

    const { hashedPassword, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
