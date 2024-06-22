import { z } from 'zod';

import { addCents, dateFromString, digitsFromString } from '@/libs/utils';

export const addExpenseSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'A descrição é obrigatória' })
    .max(32, { message: 'A descrição não pode exceder 32 caracteres' }),
  amount: z
    .string()
    .min(7, { message: 'Valor mínimo é R$ 0,01' })
    .max(13, { message: 'Valor máximo é R$ 999.999,99' })
    .refine((value) => +addCents(digitsFromString(value)) >= 0.01, {
      message: 'Valor mínimo é R$ 0,01',
    })
    .refine((value) => +addCents(digitsFromString(value)) <= 999_999.99, {
      message: 'Valor máximo é R$ 999.999,99',
    })
    .transform((value) => addCents(digitsFromString(value))),
  date: z
    .string()
    .length(10, { message: 'Preencha a data corretamente' })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Preencha a data corretamente' })
    .refine((value) => dateFromString(value).getTime() >= new Date(2023, 0, 1).getTime(), {
      message: 'Deve ser posterior a 01/01/2023',
    })
    .refine(
      (value) =>
        dateFromString(value).getTime() <
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime(),
      {
        message: 'Deve ser até o fim do mês',
      }
    )
    .transform((value) => dateFromString(value).toISOString()),
  category_id: z.coerce.number({ required_error: 'A categoria é obrigatória' }),
});
