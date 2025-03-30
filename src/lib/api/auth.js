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

export async function submitRating(data) {
  const TOKEN = Cookies.get("token");
  const response = await fetch(`${API_URL}/auth/ratings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error);
  }
  return result;
}

export async function requestPasswordReset(email) {
  const response = await fetch(`${API_URL}/auth/password-reset/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.detail || "Erro ao enviar email de recuperação");
  }
  return result;
}

export async function confirmPasswordReset(uid, token, new_password) {
  const response = await fetch(`${API_URL}/auth/password-reset/confirm/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid,
      token,
      new_password,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.detail || "Erro ao redefinir senha");
  }
  return result;
}
