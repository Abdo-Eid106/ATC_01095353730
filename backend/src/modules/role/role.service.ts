import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { RoleEnum } from './enums/role.enum';
import { ConfigService } from '@nestjs/config';
import { User } from '../auth/entities/user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
    await this.seedAdmin();
  }

  async seedRoles() {
    const roles = Object.values(RoleEnum).map((name) => name);
    for (let name of roles) {
      if (!(await this.roleRepo.existsBy({ name })))
        await this.roleRepo.save(this.roleRepo.create({ name }));
    }
  }

  async seedAdmin() {
    const name = this.configService.get<string>('ADMIN_NAME')!;
    const email = this.configService.get<string>('ADMIN_EMAIL')!;
    const password = this.configService.get<string>('ADMIN_PASSWORD')!;

    if (!(await this.userRepo.existsBy({ email }))) {
      const role = (await this.roleRepo.findOne({
        where: { name: RoleEnum.ADMIN },
      }))!;

      const hashedPassword = await hash(password, 12);
      return await this.userRepo.save(
        this.userRepo.create({ name, email, password: hashedPassword, role }),
      );
    }
  }
}
