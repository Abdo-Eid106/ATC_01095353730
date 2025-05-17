import { Expose, Type } from 'class-transformer';
import { PaginatorMetaOutput } from 'src/common/dto/output/paginator.output';
import { EventDto } from './event.dto';

export class PaginatedEventsOutput {
  @Expose()
  @Type(() => PaginatorMetaOutput)
  meta: PaginatorMetaOutput;

  @Expose()
  @Type(() => EventDto)
  data: EventDto[];
}
