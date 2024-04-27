import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    CacheModule.register(),
    JwtModule.register({}),
    PassportModule,
  ],
  controllers: [],
  providers: [],
})
export class FilmsModule {}
