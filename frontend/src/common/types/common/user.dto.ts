import type { RoleEnum } from "../enums/role.enum";

type RoleDto = {
  name: RoleEnum;
};

export type UserDto = {
  id: number;
  email: string;
  password: string;
  role: RoleDto;
};
