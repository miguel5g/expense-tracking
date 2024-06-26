'use client';

import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { type Expense, useExpenses } from '@/stores/expenses';
import { cn } from '@/libs/utils';

const KEY_MAP: Record<string, string> = {
  total: 'Este ano',
  totalLastYear: 'Ano passado',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 p-2 overflow-hidden text-xs rounded-md shadow bg-background text-foreground animate-in fade-in-0 zoom-in-95">
        {(payload as any[]).map((item, index) => (
          <div key={index} className="flex">
            <div className={cn('w-8 h-4 rounded mr-2', item.className?.replace('fill', 'bg'))} />
            <p>{KEY_MAP[item.dataKey]}:</p>
            <p className="ml-1">
              {(+item.value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const ExpensesGraph: React.FC = () => {
  const expenses = useExpenses((store) => store.expenses);

  const data = useMemo(() => {
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

    const now = new Date();
    return new Array(12)
      .fill(0)
      .map((_, index) => {
        const month = new Date(now.getFullYear(), now.getMonth() - index, 1).toLocaleString(
          'pt-BR',
          { month: 'long' }
        );
        const actual = new Date(now.getFullYear(), now.getMonth() - index, 1).toLocaleString(
          'pt-BR',
          { month: '2-digit', year: 'numeric' }
        );
        const lastYear = new Date(now.getFullYear() - 1, now.getMonth() - index, 1).toLocaleString(
          'pt-BR',
          { month: '2-digit', year: 'numeric' }
        );

        return {
          name: month.slice(0, 3),
          totalKey: actual,
          totalLastYearKey: lastYear,
        };
      })
      .map(({ name, totalKey, totalLastYearKey }, index) => {
        return {
          name,
          total: grouped[totalKey]?.reduce((acc, expense) => expense.amount + acc, 0) || 0,
          totalLastYear:
            grouped[totalLastYearKey]?.reduce((acc, expense) => expense.amount + acc, 0) || 0,
        };
      })
      .reverse();
  }, [expenses]);

  return (
    <section className="p-4 mt-16 rounded-lg md:-mx-4 bg-slate-100">
      <h2 className="text-xl">Comparativo de despesas</h2>

      <ResponsiveContainer width="100%" height={320} className="mt-4">
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 28 }}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
          />
          <Tooltip
            content={<CustomTooltip />}
            // @ts-ignore
            cursor={{ className: 'fill-black/10', radius: [6, 6, 0, 0] }}
          />
          <Bar
            dataKey="totalLastYear"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-indigo-300"
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-indigo-500"
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-4">
        <div className="inline-flex items-center gap-2">
          <div className="w-8 h-4 bg-indigo-300 rounded" />
          <span>Ano anterior</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <div className="w-8 h-4 bg-indigo-500 rounded" />
          <span>Este ano</span>
        </div>
      </div>
    </section>
  );
};

export { ExpensesGraph };
