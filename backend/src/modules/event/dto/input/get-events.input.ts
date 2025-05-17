import { IsOptional, IsPositive, IsString } from 'class-validator';

export class GetEventsInput {
  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
