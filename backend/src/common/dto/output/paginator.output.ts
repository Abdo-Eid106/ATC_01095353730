import { Expose } from 'class-transformer';

export class PaginatorMetaOutput {
  @Expose()
  page: number;

  @Expose()
  pages: number;

  @Expose()
  total: number;

  @Expose()
  limit: number;
}
