import { NextResponse } from "next/server";

/**
 * Middleware para controle de autenticação e redirecionamento baseado no tipo de perfil
 * @param {import('next/server').NextRequest} req - Objeto de requisição do Next.js
 * @returns {import('next/server').NextResponse} - Resposta com redirecionamento ou continuação da requisição
 * 
 * @description
 * Este middleware realiza as seguintes verificações:
 * 1. Verifica se o usuário está autenticado (token e cookie de usuário existem)
 * 2. Redireciona para /login se não estiver autenticado
 * 3. Verifica o tipo de perfil do usuário (barbeiro/cliente)
 * 4. Redireciona para a área correta baseado no tipo de perfil:
 *    - Barbeiros não podem acessar área de clientes
 *    - Clientes não podem acessar área de barbeiros
 * 
 * @example
 * // Requisição para /dashboard/customers com perfil de barbeiro
 * // Resultado: Redirecionamento para /dashboard/barbers
 * 
 * // Requisição para /dashboard/barbers com perfil de cliente
 * // Resultado: Redirecionamento para /dashboard/customers
 */
export function middleware(req) {
  const token = req.cookies.get("token");
  const userCookie = req.cookies.get("user");

  if (!token || !userCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = JSON.parse(userCookie.value);

  if (
    user.profile_type === "barbeiro" &&
    req.url.includes("/dashboard/customers")
  ) {
    return NextResponse.redirect(new URL("/dashboard/barbers", req.url));
  }

  if (
    user.profile_type === "cliente" &&
    req.url.includes("/dashboard/barbers")
  ) {
    return NextResponse.redirect(new URL("/dashboard/customers", req.url));
  }

  return NextResponse.next();
}

/**
 * Configuração do middleware
 * @type {Object}
 * @property {string[]} matcher - Array de padrões de URL que o middleware deve interceptar
 * 
 * @description
 * Define as rotas que o middleware deve processar:
 * - /dashboard/barbers/* - Todas as rotas da área do barbeiro
 * - /dashboard/customers/* - Todas as rotas da área do cliente
 */
export const config = {
  matcher: ["/dashboard/barbers/:path*", "/dashboard/customers/:path*"],
};
