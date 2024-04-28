import { IsNotEmpty } from 'class-validator';

export class createDirectorDto {
  @IsNotEmpty()
  name: string;
}
