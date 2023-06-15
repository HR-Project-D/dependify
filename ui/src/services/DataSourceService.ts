import {
  APIResponseConfirmDataSource,
  APIResponseGenerateDataSource,
} from "@/types/api/api-data-source";
import { getApiUrl } from "@/utils/api";
import { getCookie } from "@/utils/cookies";

const API_URL = getApiUrl();

/**
 * http://127.0.0.1:8000/api/generate_datasource
 */
async function generateDataSource({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}): Promise<APIResponseGenerateDataSource> {
  const URL = API_URL + "generate_datasource/";

  console.log(
    JSON.stringify({
      name,
      description,
      url,
    })
  );

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken") || "",
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      description,
      url,
    }),
  });

  console.log(response);

  const json = await response.json();
  return json;
}

async function confirmDataSource({
  name,
}: {
  name: string;
}): Promise<APIResponseConfirmDataSource> {
  const URL = API_URL + "confirm_datasource/";

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken") || "",
    },
    credentials: "include",
    body: JSON.stringify({
      name,
    }),
  });

  const json = await response.json();
  return json;
}

export const DataSourceService = {
  generateDataSource,
  confirmDataSource,
};
