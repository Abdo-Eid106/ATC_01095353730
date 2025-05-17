import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagInput } from './dto/input/create-tag.input';
import { Tag } from './entities/tag.entity';
import { ILike, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorEnum } from 'src/common/enums/error.enum';
import { GetTagsInput } from './dto/input/get-tags.input';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}

  async create(createTagInput: CreateTagInput) {
    if (await this.tagRepo.existsBy({ name: createTagInput.name }))
      throw new ConflictException(ErrorEnum.TAG_ALREADY_EXIST);

    return this.tagRepo.save(this.tagRepo.create(createTagInput));
  }

  async findAll(getTagsInput: GetTagsInput) {
    const { page = 1, limit = 10, search = '' } = getTagsInput;

    const [tags, count] = await this.tagRepo.findAndCount({
      where: { name: ILike(`%${search}%`) },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: tags,
      meta: {
        page,
        limit,
        pages: Math.ceil(count / limit),
        total: count,
      },
    };
  }

  async findOne(id: Tag['id']) {
    const tag = await this.tagRepo.findOne({ where: { id } });
    if (!tag) throw new NotFoundException(ErrorEnum.TAG_NOT_FOUND);
    return tag;
  }

  async update(id: Tag['id'], updateTagInput: CreateTagInput) {
    const tag = await this.findOne(id);
    return this.tagRepo.save({ ...tag, ...updateTagInput });
  }

  async remove(id: Tag['id']) {
    const tag = await this.findOne(id);
    return this.tagRepo.remove(tag);
  }

  async findByIds(ids: Tag['id'][]) {
    const tags = await this.tagRepo.find({ where: { id: In(ids) } });
    if (tags.length != ids.length)
      throw new NotFoundException(ErrorEnum.SOME_TAGS_NOT_FOUND);
    return tags;
  }
}
