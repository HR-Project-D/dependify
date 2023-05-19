export type Dependency = {
  id: string;
  label: string;
  version: string;
  sbomFile: string;
  sbomFormat: string;
  dockerImage: string | null;
};
