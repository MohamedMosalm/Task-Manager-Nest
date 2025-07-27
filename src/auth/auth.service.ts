import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(
      loginDto.password,
      user.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { hashedPassword, ...result } = user;
    return result;
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      user,
      access_token,
    };
  }

  async register(registerDto: RegisterDto) {
    const userExists = await this.userService.findUserByEmail(
      registerDto.email,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hash(registerDto.password, 10);

    const userData = {
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      password: hashedPassword,
    };

    const user = await this.userService.createUser(userData);

    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      user,
      access_token,
    };
  }
}
