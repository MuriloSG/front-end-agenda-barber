import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes CSS usando clsx e tailwind-merge
 * @param {...string|object} inputs - Classes CSS ou objetos de condição
 * @returns {string} - Classes CSS combinadas e otimizadas
 * @example
 * cn("text-red-500", { "bg-blue-500": isActive })
 * // Retorna: "text-red-500 bg-blue-500" se isActive for true
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um valor numérico para moeda brasileira (BRL)
 * @param {number} value - Valor a ser formatado
 * @returns {string} - Valor formatado em reais (R$)
 * @example
 * formatCurrency(1000)
 * // Retorna: "R$ 1.000,00"
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Formata um horário para o formato brasileiro (HH:mm)
 * @param {string} time - Horário no formato HH:mm:ss
 * @returns {string} - Horário formatado (HH:mm) ou mensagem de indisponibilidade
 * @example
 * formatTime("14:30:00")
 * // Retorna: "14:30"
 * formatTime(null)
 * // Retorna: "Horário não disponível"
 */
export const formatTime = (time) => {
  if (!time) return "Horário não disponível";
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};