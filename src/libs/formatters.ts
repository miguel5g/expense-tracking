import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function currency(
  value: number,
  { currency, lang }: { lang: string; currency: string } = { lang: 'pt-BR', currency: 'BRL' }
) {
  return value.toLocaleString(lang, { style: 'currency', currency });
}

function date(value: Date | string) {
  const parsed = new Date(value);

  return format(parsed, 'dd/MM/yyyy', { locale: ptBR });
}

export const formatters = {
  currency,
  date,
};
