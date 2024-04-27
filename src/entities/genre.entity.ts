import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Genre extends AbstractEntity<Genre> {
  @Column({ unique: true })
  name: string;
}
