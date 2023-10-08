import { UserType } from './UserType';

interface LoginResponseType {
  status: boolean;
  message: string;
  data: UserType;
}

export type { LoginResponseType };
