import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Director } from './director.entity';
import { Genre } from './genre.entity';
import { Actor } from './actor.entity';

@Entity()
export class Film extends AbstractEntity<Film> {
  @Column()
  name: string;

  @Column({ name: 'release_year' })
  releaseYear: number;

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable()
  genres: Genre[];

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Director, { cascade: true })
  @JoinTable()
  directors: Director[];

  @ManyToMany(() => Actor, { cascade: true })
  @JoinTable()
  actors: Actor[];
}
