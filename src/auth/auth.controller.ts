import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string) {
    const user: User = await this.authService.validateUser(username);
    if (!user) {
      return this.authService.register(username)
    }
    return this.authService.login(user);
  }
}
