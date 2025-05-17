export type CreateEventInput = {
  name: string;
  description: string;
  date: Date;
  venue: string;
  price: number;
  image: string;
  categoryId: number;
  tagIds: number[];
};
