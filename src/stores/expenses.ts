import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category_id: number;
}

interface ExpensesStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
}

const useExpenses = create(
  persist<ExpensesStore>(
    (set) => ({
      expenses: [],
      addExpense: (expense) => {
        set((state) => ({
          expenses: [...state.expenses, expense],
        }));
      },
    }),
    { name: 'expenses', storage: createJSONStorage(() => localStorage) }
  )
);

export { useExpenses };
