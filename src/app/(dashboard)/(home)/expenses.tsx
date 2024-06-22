import { AddExpenseDialog } from '@/components/dialogs/add-expense';
import { Emoji } from '@/components/emoji';

interface ExpenseItemProps {
  expense: {
    id: number;
    description: string;
    amount: number;
    date: Date;
    category: {
      emoji: string;
      name: string;
    };
  };
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <li className="flex items-center gap-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/5">
        <Emoji
          className="text-2xl select-none"
          symbol={expense.category.emoji}
          label={expense.category.name}
        />
      </div>

      <div className="flex items-center flex-1 py-2 border-b">
        <div className="flex flex-col flex-1">
          <p>{expense.description}</p>
          <p className="-mt-1 text-sm text-foreground/50">{expense.date.toLocaleDateString()}</p>
        </div>

        <span>
          {expense.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
    </li>
  );
};

const Expenses: React.FC = () => {
  return (
    <section className="mt-8">
      {/* History */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Histórico de despesas</h2>
        <AddExpenseDialog />
      </div>

      <ul className="mt-4">
        <ExpenseItem
          expense={{
            id: 1,
            description: 'Coleira nova',
            amount: 100,
            date: new Date(),
            category: { emoji: '🐶', name: 'Animais de estimação' },
          }}
        />
        <ExpenseItem
          expense={{
            id: 2,
            description: 'Conta de água',
            amount: 34,
            date: new Date(),
            category: { emoji: '💧', name: 'Água' },
          }}
        />
      </ul>
    </section>
  );
};

export { Expenses };
