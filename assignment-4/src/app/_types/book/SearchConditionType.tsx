interface SearchConditionType {
  page: number;
  perPage: number;
  term: string;
}

export type { SearchConditionType };

export const defaultSearchCondition: SearchConditionType = {
  page: 1,
  perPage: 5,
  term: '',
};
