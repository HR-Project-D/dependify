import { APIResponseScan } from "@/types/api/api-scan";
import { VersionGuard } from "@/types/scan";
import { getApiUrl } from "@/utils/api";

const API_URL = getApiUrl();

/**
 * http://127.0.0.1:8000/api/scan/?name=react&version=['>0.0.0','>7.21.0']&exactMatch=false
 */
async function scan({
  dependencyName,
  exactMatch,
  versionGuards,
}: {
  dependencyName: string;
  exactMatch: boolean;
  versionGuards?: VersionGuard[];
}): Promise<APIResponseScan> {
  let versionGuardsArray: string[] = [];

  versionGuards?.forEach((versionGuard) => {
    switch (versionGuard.type) {
      case "exact":
        versionGuardsArray.push(versionGuard.version);
        break;
      case "range":
        versionGuardsArray.push(versionGuard.version);
        break;
      case "above":
        versionGuardsArray.push(`>=${versionGuard.version}`);
        break;
      case "below":
        versionGuardsArray.push(`<=${versionGuard.version}`);
        break;
    }
  });

  const versionGuardsString = JSON.stringify(versionGuardsArray);

  const URL =
    versionGuardsString === "[]"
      ? `${API_URL}scan?name=${dependencyName}&exactMatch=${exactMatch}&version=[""]`
      : `${API_URL}scan?name=${dependencyName}&exactMatch=${exactMatch}&version=${versionGuardsString}`;

  console.log(URL);

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  return json;
}

export const ScanService = {
  scan,
};
