import { DataSource } from "../data-source";

export type APIResponseGenerateDataSource = {
  message?: string;
  error?: string;
  public_key: string;
};

export type APIResponseConfirmDataSource = {
  message: string;
};

export type APIResponseGetDataSources = {
  data: Array<DataSource>;
};

export type APIResponseDeleteDataSource = {
  message?: string;
  error?: string;
};