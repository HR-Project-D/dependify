export type DataSourceType = "local" | "github" | "gitlab" | "s3";

export type DataSource = {
    id: string;
    name: string;
    label: string;
    type: DataSourceType;
    uri: string;
    enabled: boolean;
    labels?: Array<string>;
    lastSync?: string;
    lastSyncStatus?: string;
    lastSyncError?: string;
}