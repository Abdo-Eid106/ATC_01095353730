import { IsString } from 'class-validator';

export class CreateTagInput {
  @IsString()
  name: string;
}
