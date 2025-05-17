import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventInput } from './dto/input/create-event.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tag/tag.service';
import { ILike, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { ErrorEnum } from 'src/common/enums/error.enum';
import { GetEventsInput } from './dto/input/get-events.input';
import { User } from '../auth/entities/user.entity';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly bookingService: BookingService,
  ) {}

  async create(createEventInput: CreateEventInput) {
    const { categoryId, tagIds, ...rest } = createEventInput;

    const category = await this.categoryService.findOne(categoryId)!;
    const tags = await this.tagService.findByIds(tagIds);

    return this.eventRepo.save(
      this.eventRepo.create({ ...rest, category, tags }),
    );
  }

  async findAll(
    userId: User['id'],
    getEventsInput: GetEventsInput,
    bookedFlag?: boolean,
  ) {
    const { page = 1, limit = 10, search = '' } = getEventsInput;

    let [events, count] = await this.eventRepo.findAndCount({
      where: { name: ILike(`%${search}%`) },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['category', 'tags'],
    });

    if (bookedFlag) {
      const bookedMap = await this.bookingService.getBookingStatus(userId);
      events = events.map((event) => ({
        ...event,
        booked: bookedMap.get(event.id) ?? false,
      }));
    }

    const pages = Math.ceil(count / limit);
    return {
      data: events,
      meta: {
        page,
        pages,
        limit,
        total: count,
      },
    };
  }

  async findOne(userId: User['id'], eventId: Event['id']) {
    const event = await this.eventRepo.findOne({
      where: { id: eventId },
      relations: ['category', 'tags'],
    });
    if (!event) throw new NotFoundException(ErrorEnum.EVENT_NOT_FOUND);

    const booked = await this.bookingService.isBooked(userId, eventId);
    return { ...event, booked };
  }

  async update(id: Event['id'], updateEventInput: CreateEventInput) {
    const event = await this.eventRepo.findOne({ where: { id } });
    if (!event) throw new NotFoundException(ErrorEnum.EVENT_NOT_FOUND);

    const { categoryId, tagIds, ...rest } = updateEventInput;

    const category = await this.categoryService.findOne(categoryId)!;
    const tags = await this.tagService.findByIds(tagIds);

    return this.eventRepo.save({ ...event, ...rest, category, tags });
  }

  async remove(id: Event['id']) {
    const event = await this.eventRepo.findOne({ where: { id } });
    if (!event) throw new NotFoundException(ErrorEnum.EVENT_NOT_FOUND);

    return this.eventRepo.remove(event);
  }
}
