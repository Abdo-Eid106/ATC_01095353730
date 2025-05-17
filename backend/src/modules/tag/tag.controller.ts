import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagInput } from './dto/input/create-tag.input';
import { GetTagsInput } from './dto/input/get-tags.input';
import { UseGuards } from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { SuccessEnum } from 'src/common/enums/success.enum';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { PaginatedTagsOutput } from './dto/output/paginated-tags.output';
import { TagDto } from './dto/output/tag.dto';

@Controller('tags')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(@Body() createTagInput: CreateTagInput) {
    await this.tagService.create(createTagInput);
    return { message: SuccessEnum.TAG_CREATION_SUCCESS };
  }

  @Get()
  @Serialize(PaginatedTagsOutput)
  findAll(@Query() getTagsInput: GetTagsInput) {
    return this.tagService.findAll(getTagsInput);
  }

  @Get(':id')
  @Serialize(TagDto)
  findOne(@Param('id', ParseIntPipe) id: Tag['id']) {
    return this.tagService.findOne(id);
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: Tag['id'],
    @Body() updateTagInput: CreateTagInput,
  ) {
    await this.tagService.update(id, updateTagInput);
    return { message: SuccessEnum.TAG_UPDATE_SUCCESS };
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: Tag['id']) {
    await this.tagService.remove(id);
    return { message: SuccessEnum.TAG_DELETION_SUCCESS };
  }
}
