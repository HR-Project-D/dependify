export type APIResponseSetup = {
  status: "success" | "fail";
  message: string;
  registration_key?: string;
};

export type APIResponseSetupRegistration = {
  error?: string;
  message?: string;
}