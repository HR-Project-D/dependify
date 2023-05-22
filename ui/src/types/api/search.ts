import { DataSourceType } from "../dataSource";
import { Dependency } from "../dependency";

/** api/search */
export type APIResponseSearch = {
  data: Array<{
    name: string;
    label: string;
    type: DataSourceType;
    results?: Array<Dependency>;
  }>;
};
