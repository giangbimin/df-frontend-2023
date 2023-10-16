import { SuccessMessageResponse, SuccessResponse } from './request.d';

interface Profile {
  avatar: string;
  email: string;
  fullName: string;
  id: number;
}

type ProfileResponse = SuccessResponse<Profile>;

interface UpdateUserPayload {
  avatar: string;
  fullName: string;
}

interface UpdatePasswordPayload {
  newPassword: string;
  oldPassword: string;
}

type UpdatePasswordResponse = SuccessMessageResponse;

export type {
  Profile,
  ProfileResponse,
  UpdateUserPayload,
  UpdatePasswordPayload,
  UpdatePasswordResponse,
};
