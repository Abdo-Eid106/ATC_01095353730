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
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/input/create-category.input';
import { GetCategoriesInput } from './dto/input/get-categories.input';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { SuccessEnum } from 'src/common/enums/success.enum';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { CategoryDto } from './dto/output/category.dto';
import { PaginatedCategoriesOutput } from './dto/output/paginated-categories.output';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(@Body() createCategoryInput: CreateCategoryInput) {
    await this.categoryService.create(createCategoryInput);
    return { message: SuccessEnum.CATEGORY_CREATION_SUCCESS };
  }

  @Get()
  @Serialize(PaginatedCategoriesOutput)
  findAll(@Query() getCategoriesInput: GetCategoriesInput) {
    return this.categoryService.findAll(getCategoriesInput);
  }

  @Get(':id')
  @Serialize(CategoryDto)
  findOne(@Param('id', ParseIntPipe) id: Category['id']) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: Category['id'],
    @Body() updateCategoryInput: CreateCategoryInput,
  ) {
    await this.categoryService.update(id, updateCategoryInput);
    return { message: SuccessEnum.CATEGORY_UPDATE_SUCCESS };
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: Category['id']) {
    await this.categoryService.remove(id);
    return { message: SuccessEnum.CATEGORY_DELETION_SUCCESS };
  }
}
