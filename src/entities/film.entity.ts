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

  @Column({ nullable: true })
  @ApiProperty()
  description: string;
  
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
