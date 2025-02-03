import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      console.log('❌ User not found');
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('❌ Password does not match');
      return null;
    }

    if (isPasswordValid) {
      console.log('✅ Password is correct');
      return user;
    }

    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
      
      const payload = { email: user.email, sub: user.id };
      console.log({access_token: this.jwtService.sign(payload) });
    return { access_token: this.jwtService.sign(payload) };
  }
}
