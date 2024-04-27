import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    JwtModule.register({}),
    PassportModule,
  ],
  controllers: [],
  providers: [],
})
export class FilmsModule {}
