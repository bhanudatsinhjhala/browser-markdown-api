export interface CommonResponse<T = any> {
  status: boolean;
  statusCode: number;
  message: string | string[];
  data: T | [];
  error: T | [];
}

export interface IEnvConfig {
  PORT: string;
  MONGODB_URI: string;
}

export type CommonMessageResponse = CommonResponse<[]>;
