export type DataSourceType = "local" | "github" | "gitlab" | "s3";

export type DataSource = {
  id: string;
  name: string;
  label: string;
  type: DataSourceType;
  uri: string;
  status: DataSourceStatus;
  enabled: boolean;
  labels?: Array<string>;
  lastSync?: string;
  lastSyncStatus?: DataSourceSyncStatus;
  lastSyncError?: string;
};

export type DataSourceStatus = "connected" | "error";
export type DataSourceSyncStatus = "synced" | "syncing" | "error";
