import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Actor extends AbstractEntity<Actor> {
  @Column()
  name: string;
}
