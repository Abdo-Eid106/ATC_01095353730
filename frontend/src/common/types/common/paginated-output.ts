export type PaginatedOutput<T> = {
  data: T[];
  meta: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
};
