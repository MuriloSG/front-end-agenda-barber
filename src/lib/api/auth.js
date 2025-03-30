import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Realiza o login do usuário na aplicação
 * @param {Object} data - Dados de login do usuário
 * @param {string} data.email - Email do usuário
 * @param {string} data.password - Senha do usuário
 * @returns {Promise<Object>} - Retorna os dados do usuário e token de autenticação
 * @throws {Error} - Lança erro se as credenciais forem inválidas
 */
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

/**
 * Registra um novo usuário na aplicação
 * @param {Object} data - Dados de registro do usuário
 * @param {string} data.username - Nome de usuário
 * @param {string} data.email - Email do usuário
 * @param {string} data.password - Senha do usuário
 * @param {string} data.password2 - Confirmação da senha
 * @returns {Promise<Object>} - Retorna os dados do usuário e token de autenticação
 * @throws {Error} - Lança erro se os dados forem inválidos ou o email já existir
 */
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

/**
 * Realiza o logout do usuário
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se o token for inválido ou expirado
 */
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

/**
 * Envia uma avaliação para um barbeiro
 * @param {Object} data - Dados da avaliação
 * @param {number} data.barber_id - ID do barbeiro
 * @param {number} data.rating - Nota da avaliação (1-5)
 * @returns {Promise<Object>} - Retorna os dados da avaliação
 * @throws {Error} - Lança erro se a avaliação não puder ser enviada
 */
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

/**
 * Solicita a recuperação de senha
 * @param {string} email - Email do usuário
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se o email não for encontrado
 */
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

/**
 * Confirma a redefinição de senha
 * @param {string} uid - ID único do usuário
 * @param {string} token - Token de redefinição de senha
 * @param {string} new_password - Nova senha
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se o token for inválido ou expirado
 */
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
