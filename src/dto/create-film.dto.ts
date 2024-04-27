import { IsNotEmpty } from 'class-validator';
import { Actor } from '../entities/actor.entity';
import { Director } from '../entities/director.entity';
import { Genre } from '../entities/genre.entity';

export class CreateFilmDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  releaseYear: number;
  @IsNotEmpty()
  genres: Genre[];
  @IsNotEmpty()
  directors: Director[];
  @IsNotEmpty()
  actors: Actor[];
  @IsNotEmpty()
  description: string;
}
