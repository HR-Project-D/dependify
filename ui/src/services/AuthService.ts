import { APIResponseLogin } from "@/types/api/api-auth";
import { getApiUrl } from "@/utils/api";

const API_URL = getApiUrl();

/**
 * http://127.0.0.1:8000/api/login
 */
async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<APIResponseLogin> {
  const URL = `${API_URL}login/`;

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const json = await response.json();
  return json;
}

/**
 * http://127.0.0.1:8000/api/logout
 */
async function logout(): Promise<void> {
  const URL = `${API_URL}logout/`;

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await response.json();
  return json;
}

export const AuthService = {
  login,
  logout,
};
