import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'Asmodeus' })
  username: string;
  @ApiProperty({ required: true, default: '123456' })
  @IsNotEmpty()
  password: string;
}
