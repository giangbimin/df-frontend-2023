import { UserType } from './UserType';

interface RegisterResponseType {
  status: boolean;
  message: string;
  data: UserType;
}

export type { RegisterResponseType };
