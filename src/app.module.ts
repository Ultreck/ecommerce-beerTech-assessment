import { Logger, Module } from '@nestjs/common';
import { AppController as UserController } from './app.controller';
import { UserService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST|| 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'emmolly',
      password: process.env.DB_PASSWORD || 'emmolly1',
      database: process.env.DB_DATABASE || 'user_db',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_1234_abcd_5678_secure',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    })
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {
  private readonly logger = new Logger(UserModule.name);

  constructor() {
    this.logger.log(`✅ Connected to PostgreSQL: ${process.env.DB_HOST || '127.0.0.1'}:${process.env.DB_PORT || '5432'}`);
  }
}
