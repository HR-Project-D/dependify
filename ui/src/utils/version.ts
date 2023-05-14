export const versionRegex = {
  exact: /^[0-9]+\.[0-9]+\.[0-9]+$/,
  range: /^[0-9]+\.[0-9]+\.[0-9]+-[0-9]+\.[0-9]+\.[0-9]+$/,
  below: /^=<[0-9]+\.[0-9]+\.[0-9]+$/,
  above: /^>=[0-9]+\.[0-9]+\.[0-9]+$/,
} as const;

export type VersionType = keyof typeof versionRegex;

export function validateVersion(version: string, type: VersionType) {
  return versionRegex[type].test(version);
}