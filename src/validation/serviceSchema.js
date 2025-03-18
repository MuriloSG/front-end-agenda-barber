import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Preço deve ser um número válido",
    })
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, {
      message: "Preço deve ser maior que zero",
    }),
});
