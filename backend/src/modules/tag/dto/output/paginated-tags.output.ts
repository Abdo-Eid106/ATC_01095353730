import { PaginatorMetaOutput } from 'src/common/dto/output/paginator.output';
import { TagDto } from './tag.dto';
import { Expose, Type } from 'class-transformer';

export class PaginatedTagsOutput {
  @Expose()
  @Type(() => TagDto)
  data: TagDto[];

  @Expose()
  @Type(() => PaginatorMetaOutput)
  meta: PaginatorMetaOutput;
}
