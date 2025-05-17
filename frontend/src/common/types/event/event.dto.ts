import { type CategoryDto } from "./category/category";
import type { TagDto } from "./tag.dto";

export type EventDto = {
  id: number;
  name: string;
  description: string;
  date: Date;
  venue: string;
  price: number;
  image: string;
  category: CategoryDto;
  tags: TagDto[];
  booked?: boolean;
};
