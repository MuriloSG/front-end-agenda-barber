import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(data) {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.non_field_errors);
  }
  Cookies.set("token", result.token, { expires: 7 });
  Cookies.set("user", JSON.stringify(result.user), { expires: 7 });
  return result;
}

export async function registerUser(data) {
  const response = await fetch(`${API_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      result.non_field_errors
        ? result.non_field_errors.join(", ")
        : "Erro desconhecido"
    );
  }
  Cookies.set("token", result.token, { expires: 7 });
  Cookies.set("user", JSON.stringify(result.user), { expires: 7 });
  return result;
}

export async function logoutUser() {
  const TOKEN = Cookies.get("token");
  const response = await fetch(`${API_URL}/auth/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.non_field_errors);
  }
  Cookies.remove("token");
  Cookies.remove("user");
  return result;
}
