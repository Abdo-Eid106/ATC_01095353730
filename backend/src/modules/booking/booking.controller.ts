import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Event } from '../event/entities/event.entity';
import { BookingService } from './booking.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { User } from '../auth/entities/user.entity';
import { SuccessEnum } from 'src/common/enums/success.enum';

@Controller()
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('events/:id/book')
  async create(
    @Param('id', ParseIntPipe) id: Event['id'],
    @CurrentUser() user: User,
  ) {
    await this.bookingService.create(user.id, id);
    return { message: SuccessEnum.BOOKING_SUCCESS };
  }
}
