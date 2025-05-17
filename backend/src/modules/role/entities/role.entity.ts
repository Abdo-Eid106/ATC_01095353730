import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../enums/role.enum';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ enum: RoleEnum })
  name: RoleEnum;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
