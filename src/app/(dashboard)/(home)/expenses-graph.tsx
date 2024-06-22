'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Fev',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Abr',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mai',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Ago',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Set',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Out',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dez',
    total: Math.floor(Math.random() * 5000) + 1000,
    totalLastYear: Math.floor(Math.random() * 5000) + 1000,
  },
];

const ExpensesGraph: React.FC = () => {
  return (
    <section className="mt-16">
      {/* History graph */}
      <h2 className="text-xl">Comparativo de despesas</h2>

      <ResponsiveContainer width="100%" height={320} className="mt-4">
        <BarChart data={data}>
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
          <Bar
            dataKey="totalLastYear"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary/50"
          />
          <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-4">
        <div className="inline-flex items-center gap-2">
          <div className="w-8 h-4 rounded bg-primary/50" />
          <span>Ano anterior</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <div className="w-8 h-4 rounded bg-primary" />
          <span>Este ano</span>
        </div>
      </div>
    </section>
  );
};

export { ExpensesGraph };
