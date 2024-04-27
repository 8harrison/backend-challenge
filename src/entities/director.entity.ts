import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Director extends AbstractEntity<Director> {
  @Column({ unique: true })
  name: string;
}
