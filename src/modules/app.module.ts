import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { FilmsModule } from './films.module';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LocalStrategy } from 'src/authorizationConfig/local.auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { FilmsService } from 'src/services/films.service';
import { Film } from 'src/entities/film.entity';
import { Director } from 'src/entities/director.entity';
import { Genre } from 'src/entities/genre.entity';
import { Actor } from 'src/entities/actor.entity';
import { FilmsController } from 'src/controllers/films.controller';
import { AuthController } from 'src/controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    FilmsModule,
    TypeOrmModule.forFeature([User, Film, Director, Genre, Actor]),
    JwtModule.register({}),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        ttl: 6000,
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      }),
    }),
  ],
  controllers: [FilmsController, AuthController],
  providers: [UserService, AuthService, LocalStrategy, FilmsService],
})
export class AppModule {}
