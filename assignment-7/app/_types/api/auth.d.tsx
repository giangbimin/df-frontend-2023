import { SuccessMessageResponse, SuccessResponse } from './request.d';

interface SignInPayload {
  email: string;
  password: string;
}

interface SignInResponseData {
  accessToken: string;
  email: string;
  id: number;
}

type SignInResponse = SuccessResponse<SignInResponseData>;

interface SignUpPayload {
  avatar: string;
  email: string;
  fullName: string;
  password: string;
}

type SignUpResponse = SuccessMessageResponse;

export type {
  SignInPayload,
  SignInResponseData,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
};
