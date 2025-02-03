import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{access_token: string}> {
    const payload = {email: user.email, sub: user.id};
    return {access_token: this.jwtService.sign(payload)}
  };
}
