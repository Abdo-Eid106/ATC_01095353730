import type { UserDto } from "../common/user.dto";

export type LoginOutput = {
  token: string;
  user: UserDto;
};
