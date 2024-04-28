import { IsNotEmpty } from 'class-validator';
import { Actor } from '../entities/actor.entity';
import { Director } from '../entities/director.entity';
import { Genre } from '../entities/genre.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  genres,
  directors,
  actors,
  description,
} from 'src/controllers/swagge.example';

export class CreateFilmDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'Pirates of the Caribbean' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: 2003 })
  releaseYear: number;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: 143 })
  duration: number;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: genres })
  genres: Genre[];

  @IsNotEmpty()
  @ApiProperty({ required: true, default: directors })
  directors: Director[];

  @IsNotEmpty()
  @ApiProperty({ required: true, default: actors })
  actors: Actor[];

  @IsNotEmpty()
  @ApiProperty({ required: true, default: description })
  description: string;
}
