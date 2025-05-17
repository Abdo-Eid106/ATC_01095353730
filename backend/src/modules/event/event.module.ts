import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';
import { Event } from './entities/event.entity';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    CategoryModule,
    TagModule,
    BookingModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
