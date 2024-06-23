import { ExpenseSummary } from './expense-summary';
import { Expenses } from './expenses';
import { ExpensesGraph } from './expenses-graph';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <main className="flex flex-col w-full max-w-6xl px-6 pb-16 mx-auto">
        <ExpenseSummary />

        <ExpensesGraph />

        <Expenses />
      </main>
    </div>
  );
};

export default Home;
