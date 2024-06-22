'use client';

import { formatters } from '@/libs/formatters';
import { type Expense, useExpenses } from '@/stores/expenses';
import { useMemo } from 'react';

const ExpenseSummary: React.FC = () => {
  const expenses = useExpenses((store) => store.expenses);
  const month = new Date().toLocaleString('pt-BR', { month: '2-digit', year: 'numeric' });

  const total = useMemo(() => {
    const grouped = expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('pt-BR', {
        month: '2-digit',
        year: 'numeric',
      });

      if (!acc[month]) {
        acc[month] = [];
      }

      acc[month].push(expense);

      return acc;
    }, {} as Record<string, Expense[]>);

    const total = grouped[month]?.reduce((acc, expense) => expense.amount + acc, 0) || 0;

    return formatters.currency(total);
  }, [expenses, month]);

  return (
    <section className="flex flex-col items-center justify-center mt-16">
      {/* Balance */}

      <p className="text-foreground/70">Gastos do mês</p>
      <div className="flex">
        <span className="text-4xl text-foreground/50">R$</span>
        <span className="text-6xl">{total.replace('R$', '').replace(/(.+)\,\d{2}$/, '$1').trim()}</span>
        <span className="text-4xl">{total.replace('R$', '').replace(/.+(\,\d{2})$/, '$1').trim()}</span>
      </div>
    </section>
  );
};

export { ExpenseSummary };
