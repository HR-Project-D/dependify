import { DataSourceType } from "../data-source";
import { Dependency } from "../dependency";
import { Project } from "../scan";

/** api/scan */
export type APIResponseScan = {
  data: Array<Project>;
};

