import { Dependency } from "../dependency";

/** api/search */
export type APIResponseSearch = {
  duration: number;
  result: "success" | "error";
  data: Array<{
    id: string;
    name: string;
    label: string;
    type: string;
    results: Array<Dependency>;
  }>;
};

