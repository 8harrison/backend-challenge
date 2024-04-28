import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  password: string;
}
