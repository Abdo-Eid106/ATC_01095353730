import { Expose, Type } from 'class-transformer';
import { CategoryDto } from 'src/modules/category/dto/output/category.dto';
import { TagDto } from 'src/modules/tag/dto/output/tag.dto';

export class EventDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  date: Date;

  @Expose()
  venue: string;

  @Expose()
  price: number;

  @Expose()
  image: string;

  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose()
  @Type(() => TagDto)
  tags: TagDto[];

  @Expose()
  booked?: boolean;
}
