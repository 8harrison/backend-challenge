import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
