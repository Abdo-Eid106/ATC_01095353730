import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class GetTagsInput {
  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  limit: number;

  @IsOptional()
  @IsString()
  search?: string;
}
