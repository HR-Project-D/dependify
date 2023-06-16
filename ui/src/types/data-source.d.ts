export type DataSource = {
  name: string;
  url: string;
  description: string;
  key: string;
  error: boolean;
  lastSync?: string;
};
