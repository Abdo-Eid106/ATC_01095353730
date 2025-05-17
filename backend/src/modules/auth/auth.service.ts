import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginInput } from './dto/input/login.input';
import { compare, hash } from 'bcryptjs';
import { ErrorEnum } from 'src/common/enums/error.enum';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/input/signup.input';
import { Role } from '../role/entities/role.entity';
import { RoleEnum } from '../role/enums/role.enum';
import { Payloud } from 'src/common/interfaces/payloud.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupInput: SignupInput) {
    if (await this.userRepo.existsBy({ email: signupInput.email }))
      throw new ConflictException(ErrorEnum.EMAIL_IN_USE);

    const role = (await this.roleRepo.findOne({
      where: { name: RoleEnum.USER },
    }))!;

    signupInput.password = await hash(signupInput.password, 12);
    return this.userRepo.save(this.userRepo.create({ ...signupInput, role }));
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user || !(await compare(password, user.password)))
      throw new UnauthorizedException(ErrorEnum.INVALID_CREDENTIALS);

    const token = await this.jwtService.signAsync({
      id: user.id,
      role: user.role.name,
    } as Payloud);

    return { user, token };
  }

  async getUser(userId: User['id']) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException(ErrorEnum.USER_NOT_FOUND);

    return user;
  }
}
