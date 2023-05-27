export function getOperatingSystem(): string {
  if (typeof window === "undefined") return "Unknown";

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("win") !== -1) {
    return "Windows";
  } else if (userAgent.indexOf("mac") !== -1) {
    return "Mac";
  } else if (userAgent.indexOf("x11") !== -1) {
    return "Unix";
  } else if (userAgent.indexOf("linux") !== -1) {
    return "Linux";
  }

  return "Unknown";
}
