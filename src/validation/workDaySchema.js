import { z } from "zod";

export const workDaySchema = z.object({
  day_of_week: z
    .string()
    .min(1, "Selecione um dia da semana")
    .refine(
      (val) =>
        [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ].includes(val),
      {
        message: "Selecione um dia válido",
      }
    ),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: "Horário inválido. Use o formato HH:MM:SS",
  }),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: "Horário inválido. Use o formato HH:MM:SS",
  }),
  lunch_start_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
      message: "Horário inválido. Use o formato HH:MM:SS",
    }),
  lunch_end_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
      message: "Horário inválido. Use o formato HH:MM:SS",
    }),
  slot_duration: z
    .string()
    .min(1, "Informe a duração do atendimento") 
    .refine((val) => !isNaN(Number(val)), {
      message: "A duração deve ser um número",
    })
    .transform((val) => Number(val)) 
    .pipe(
      z
        .number()
        .int("A duração deve ser um número inteiro, exemplo 1")
    ),
});

