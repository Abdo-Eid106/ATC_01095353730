import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Event } from '../event/entities/event.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { ErrorEnum } from 'src/common/enums/error.enum';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(userId: User['id'], eventId: Event['id']) {
    if (!(await this.eventRepo.existsBy({ id: eventId })))
      throw new NotFoundException(ErrorEnum.EVENT_NOT_FOUND);

    const booking = await this.bookingRepo.existsBy({
      user: { id: userId },
      event: { id: eventId },
    });
    if (booking) throw new ConflictException(ErrorEnum.EVENT_ALREADY_BOOKED);

    return this.bookingRepo.save(
      this.bookingRepo.create({ user: { id: userId }, event: { id: eventId } }),
    );
  }

  async getBookingStatus(userId: User['id']) {
    const events = await this.eventRepo
      .createQueryBuilder('event')
      .leftJoin('event.bookings', 'booking')
      .leftJoin('booking.user', 'user')
      .select(['event.id AS id', 'BOOL_OR(user.id = :userId) AS booked'])
      .groupBy('event.id')
      .setParameters({ userId })
      .getRawMany();

    const bookedMap = new Map<Event['id'], boolean>();
    events.forEach((event) => bookedMap.set(event.id, event.booked));

    return bookedMap;
  }

  async isBooked(userId: User['id'], eventId: Event['id']) {
    return this.bookingRepo.existsBy({
      user: { id: userId },
      event: { id: eventId },
    });
  }
}
