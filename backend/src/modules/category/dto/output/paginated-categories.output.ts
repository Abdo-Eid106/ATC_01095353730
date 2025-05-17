import { PaginatorMetaOutput } from 'src/common/dto/output/paginator.output';
import { CategoryDto } from './category.dto';
import { Expose, Type } from 'class-transformer';

export class PaginatedCategoriesOutput {
  @Expose()
  @Type(() => CategoryDto)
  data: CategoryDto[];

  @Expose()
  @Type(() => PaginatorMetaOutput)
  meta: PaginatorMetaOutput;
}
