export type Dependency = {
  label: string;
  version: string;
  sbomFile: string;
  sbomFormat: string;
  dockerImage?: string;
};
