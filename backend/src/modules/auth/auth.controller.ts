import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/input/signup.input';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { LoginOutput, UserDto } from './dto/output/login.output';
import { SuccessEnum } from 'src/common/enums/success.enum';
import { LoginInput } from './dto/input/login.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Payloud } from 'src/common/interfaces/payloud.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupInput: SignupInput) {
    await this.authService.signup(signupInput);
    return { message: SuccessEnum.SIGNUP_SUCCESS };
  }

  @Post('login')
  @Serialize(LoginOutput)
  login(@Body() signupInput: LoginInput) {
    return this.authService.login(signupInput);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  getMe(@CurrentUser() user: Payloud) {
    return this.authService.getUser(user.id);
  }
}
