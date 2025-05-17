import { User } from 'src/modules/auth/entities/user.entity';
import { RoleEnum } from 'src/modules/role/enums/role.enum';

export interface Payloud {
  id: User['id'];
  role: RoleEnum;
}
