import { IsEmail, IsString, Length } from 'class-validator';

export class SignupInput {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;
}
