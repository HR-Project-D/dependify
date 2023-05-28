const appVersion = require("../../../version.json");

export const versionRegex = {
  exact: /^[0-9]+\.[0-9]+\.[0-9]+$/,
  range: /^[0-9]+\.[0-9]+\.[0-9]+-[0-9]+\.[0-9]+\.[0-9]+$/,
  below: /^[0-9]+\.[0-9]+\.[0-9]+$/,
  above: /^[0-9]+\.[0-9]+\.[0-9]+$/,
} as const;

export type VersionType = keyof typeof versionRegex;

export function validateVersion(version: string, type: VersionType): boolean {
  return versionRegex[type].test(version);
}

export function getVersionPlaceholder(type: VersionType): string {
  if (type === "range") {
    return "1.0.0-2.0.0";
  }

  return "0.0.0";
}

export function getApplicationVersion(): string {
  return appVersion;
}
