interface BooksPagingType {
  page: number | 1;
  perPage: number | 5;
  total: number | 0;
  totalPages: number | 0;
}

export type { BooksPagingType };

export const defaultBooksPaging: BooksPagingType = {
  page: 1,
  total: 0,
  totalPages: 0,
  perPage: 5,
};
