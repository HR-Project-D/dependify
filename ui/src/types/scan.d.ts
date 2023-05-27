export type ScanFormValues = {
  dependencyName: string;
  exactMatch: boolean;
  versionType: VersionType;
  version: string;
};

export type Query = {
  id: string;
  dependencyName: string;
  exactMatch: boolean;
  versions: Array<VersionGuard>;
}

export type VersionGuard = {
  type: VersionType;
  version: string;
};