import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const registrationSchema = z.object({
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .max(150, "O nome de usuário não pode ter mais que 150 caracteres"),

  email: z
    .string()
    .email("Email inválido")
    .max(254, "O email não pode ter mais de 254 caracteres"),

  whatsapp: z.string().regex(/^\d{11}$/, "Número de WhatsApp inválido"),

  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),

  profile_type: z.enum(["barbeiro", "cliente"], {
    errorMap: () => ({ message: "Tipo de perfil inválido" }),
  }),

  city: z.enum(["salinas_mg"], {
    errorMap: () => ({ message: "Cidade inválida" }),
  }),
});

export const UpdateBarberSchema = z.object({
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .max(150, "O nome de usuário não pode ter mais que 150 caracteres"),
  email: z.string().email("Email inválido"),
  city: z.string().min(1, "Selecione uma cidade"),
  whatsapp: z.string().regex(/^\d{11}$/, "Número de WhatsApp inválido"),
  pix_key: z.string().min(1, "Chave PIX é obrigatória"),
  address: z.string().min(1, "Endereço é obrigatório"),
});

export const UpdateCustomerSchema = z.object({
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .max(150, "O nome de usuário não pode ter mais que 150 caracteres"),
  email: z.string().email("Email inválido"),
  city: z.string().min(1, "Selecione uma cidade"),
  whatsapp: z.string().regex(/^\d{11}$/, "Número de WhatsApp inválido"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(128, "A senha não pode ter mais que 128 caracteres"),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });