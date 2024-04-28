import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Director } from './director.entity';
import { Genre } from './genre.entity';
import { Actor } from './actor.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Film extends AbstractEntity<Film> {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ name: 'release_year' })
  @ApiProperty()
  releaseYear: number;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty({ description: 'A duração do filme em minutos' })
  duration: number;

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable()
  @ApiProperty()
  genres: Genre[];

  @ManyToMany(() => Director, { cascade: true })
  @JoinTable()
  @ApiProperty()
  directors: Director[];

  @ManyToMany(() => Actor, { cascade: true })
  @JoinTable()
  @ApiProperty()
  actors: Actor[];
}
