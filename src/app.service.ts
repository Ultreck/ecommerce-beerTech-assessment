import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(name: string, email:string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    // await user.hashPassword();
    return await this.userRepository.save(user);
  };

  async findUserByEmail(email: string): Promise<User | null>{
    return await this.userRepository.findOne({where: {email}})
  };
  async findUserById(id: number): Promise<User | null>{
    return await this.userRepository.findOne({where: {id}});
  };
}
