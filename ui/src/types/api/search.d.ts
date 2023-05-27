import { DataSourceType } from "../dataSource";
import { Dependency } from "../dependency";

/** api/scan */
export type APIResponseScan = {
  data: Array<{
    name: string;
    version: string;
    dockerImage: string;
    sbomFile: string;
    results: Array<{
      label: string;
      version: string;
    }>;
  }>;
};