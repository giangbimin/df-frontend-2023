import { SuccessResponse } from './request.d';

interface Topic {
  code: string;
  id: number;
  name: string;
}

type ListTopicResponse = SuccessResponse<Topic[]>;

export type { Topic, ListTopicResponse };
