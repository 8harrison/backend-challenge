import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  username: string;

  @Column()
  password: string;
}
