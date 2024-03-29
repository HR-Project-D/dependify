import { APIResponseLogin, APIResponseUser } from "@/types/api/api-auth";
import { APIResponseSetup, APIResponseSetupRegistration } from "@/types/api/api-setup";
import { getApiUrl } from "@/utils/api";
import { getCookie } from "@/utils/cookies";

const API_URL = getApiUrl();

/**
 * http://127.0.0.1:8000/api/setup
 */
async function setup({ key }: { key: string }): Promise<APIResponseSetup> {
  const URL = `${API_URL}setup/`;

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key }),
    credentials: "include",
  });

  const json = await response.json();
  return json;
}

/**
 * http://127.0.0.1:8000/api/setup_registration
 */
async function setup_registration({
  name,
  email,
  password,
  role,
  key,
}: {
  name: string;
  email: string;
  password: string;
  role: string;
  key: string;
}): Promise<APIResponseSetupRegistration> {
  const URL = `${API_URL}setup_registration/`;

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, role, key }),
    credentials: "include",
  });

  const json = await response.json();
  return json;
}

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
      "X-CSRFToken": getCookie("csrftoken") || "",
    },
    credentials: "include",
  });

  const json = await response.json();
  return json;
}

/**
 * http://127.0.0.1:8000/api/user
 */
async function getUser(): Promise<APIResponseUser> {
  const URL = `${API_URL}user/`;

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken") || "",
    },
    credentials: "include",
  });

  const json = await response.json();
  return json;
}

export const AuthService = {
  login,
  setup,
  setup_registration,
  logout,
  getUser,
};
