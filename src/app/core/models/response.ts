export interface Response<T> {
  data?: T;
  isSuccess: boolean;
  message: string;
  error?: object;
}

export interface KeyPair {
  key: string;
  value: string;
}
