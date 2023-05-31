export type APIResponseLogin = {
  message?: string;
  error?: string;
  
  name?: string;
  email?: string;
  role?: string;
};

export type APIResponseUser = {
  name: string;
  email: string;
  role: string;
};
