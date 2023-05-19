import { APIResponseSearch } from "@/types/api/search";
import { getApiUrl } from "@/utils/api";

const API_URL = getApiUrl();

async function search({
  dependencyName,
  dependencyVersion,
  dataSource,
}: {
  dependencyName: string;
  dependencyVersion: string;
  dataSource: string;
}): Promise<APIResponseSearch> {
  console.log(
    `${API_URL}scan?name=${dependencyName}&version=${dependencyVersion}&source=${dataSource}`
  );

  const response = await fetch(
    `${API_URL}scan?name=${dependencyName}&version=${dependencyVersion}&source=${dataSource}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  return json;
}

export const SearchService = {
  search,
};
