import { Expose, Type } from 'class-transformer';

export class RoleDto {
  @Expose()
  name: string;
}

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => RoleDto)
  role: RoleDto;
}

export class LoginOutput {
  @Expose()
  token: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
