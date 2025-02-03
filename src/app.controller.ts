import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './app.service';
import { User } from './user.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('users')
export class AppController {
  constructor(
    private readonly UserService: UserService, 
    private authService: AuthService
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return await this.UserService.findUserById(id);
  }
  ;
@MessagePattern({cmd: 'register'})
  async registerUser(@Payload() data: {name: string, email: string, password: string}): Promise<User> {
    return await this.UserService.createUser(data.name, data.email, data.password);
  };

  @MessagePattern({cmd: 'login'})
  async login(@Payload() data: {email:string, password: string}): Promise<{access_token: string}> {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return await this.authService.login(user);
  }
}
