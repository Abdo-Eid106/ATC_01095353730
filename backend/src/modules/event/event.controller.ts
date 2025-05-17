import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/input/create-event.input';
import { GetEventsInput } from './dto/input/get-events.input';
import { Event } from './entities/event.entity';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { EventDto } from './dto/output/event.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { SuccessEnum } from 'src/common/enums/success.enum';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { PaginatedEventsOutput } from './dto/output/paginated-events.output';
import { Payloud } from 'src/common/interfaces/payloud.interface';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('events')
  @Roles(RoleEnum.ADMIN)
  async create(@Body() createEventDto: CreateEventInput) {
    await this.eventService.create(createEventDto);
    return { message: SuccessEnum.EVENT_CREATION_SUCCESS };
  }

  @Get('admin/events')
  @Serialize(PaginatedEventsOutput)
  findEventsForAdmin(
    @Query() getEventsInput: GetEventsInput,
    @CurrentUser() user: Payloud,
  ) {
    return this.eventService.findAll(user.id, getEventsInput, false);
  }

  @Get('user/events')
  @Serialize(PaginatedEventsOutput)
  findEventsForUser(
    @Query() getEventsInput: GetEventsInput,
    @CurrentUser() user: Payloud,
  ) {
    return this.eventService.findAll(user.id, getEventsInput, true);
  }

  @Get('events/:id')
  @Serialize(EventDto)
  findOne(
    @Param('id', ParseIntPipe) id: Event['id'],
    @CurrentUser() user: Payloud,
  ) {
    return this.eventService.findOne(user.id, id);
  }

  @Put('events/:id')
  @Roles(RoleEnum.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: Event['id'],
    @Body() updateEventDto: CreateEventInput,
  ) {
    await this.eventService.update(id, updateEventDto);
    return { message: SuccessEnum.EVENT_UPDATE_SUCCESS };
  }

  @Delete('events/:id')
  @Roles(RoleEnum.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: Event['id']) {
    await this.eventService.remove(id);
    return { message: SuccessEnum.EVENT_DELETION_SUCCESS };
  }
}
