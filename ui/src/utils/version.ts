import { KeyboardEvent } from "react";

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

type AssertVersionAction = "add" | "remove" | "block";

export function assertVersionInput(
  e: KeyboardEvent<HTMLInputElement>,
  currentValue: string,
  versionType: VersionType
): AssertVersionAction {
  const input = e.key;
  const position = currentValue.length;
  const maxChars = versionType === "range" ? 11 : 5;

  if (input === "Backspace") {
    return "remove";
  }

  if (position >= maxChars) {
    e.preventDefault();
    return "block";
  }

  if (position === 0 && !/[0-9]/.test(input.charAt(position))) {
    e.preventDefault();
    return "block";
  }
  if (versionType === "range" && position === 5 && input === "-") {
    return "add";
  }

  if (position % 2 === 1) {
    const isDot = input === ".";
    const isInvalidCharacter =
      (versionType === "range" && input !== "." && !/[0-9]/.test(e.key)) ||
      !isDot;

    if (isInvalidCharacter) {
      e.preventDefault();
      return "block";
    }
  } else if (!/[0-9]/.test(input)) {
    e.preventDefault();
    return "block";
  }

  return "add";
}
