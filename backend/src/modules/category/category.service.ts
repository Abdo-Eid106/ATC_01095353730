import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryInput } from './dto/input/create-category.input';
import { Category } from './entities/category.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorEnum } from 'src/common/enums/error.enum';
import { GetCategoriesInput } from './dto/input/get-categories.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    if (await this.categoryRepo.existsBy({ name: createCategoryInput.name }))
      throw new ConflictException(ErrorEnum.CATEGORY_ALREADY_EXIST);

    return this.categoryRepo.save(
      this.categoryRepo.create(createCategoryInput),
    );
  }

  async findAll(getCategoriesInput: GetCategoriesInput) {
    const { page = 1, limit = 10, search = '' } = getCategoriesInput;

    const [categories, count] = await this.categoryRepo.findAndCount({
      where: { name: ILike(`%${search}%`) },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: categories,
      meta: {
        page,
        limit,
        pages: Math.ceil(count / limit),
        total: count,
      },
    };
  }

  async findOne(id: Category['id']) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException(ErrorEnum.CATEGORY_NOT_FOUND);
    return category;
  }

  async update(id: Category['id'], createCategoryInput: CreateCategoryInput) {
    const category = await this.findOne(id);
    return this.categoryRepo.save({ ...category, ...createCategoryInput });
  }

  async remove(id: Category['id']) {
    const category = await this.findOne(id);
    return this.categoryRepo.remove(category);
  }
}
