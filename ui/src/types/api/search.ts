import { Dependency } from "../dependency";

/** api/search */
export type APIResponseSearch = {
  data: Array<{
    name: string;
    label: string;
    type: string;
    results?: Array<Dependency>;
  }>;
};
