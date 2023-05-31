export type APIResponseLogin = {
  message?: string;
  error?: string;
  user?: User;
};

export type APIResponseUser = {
  name: string;
  email: string;
  role: string;
};
