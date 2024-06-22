const ExpenseSummary: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-16">
      {/* Balance */}

      <p className="text-foreground/70">Gastos este mês</p>
      <div className="flex">
        <span className="text-4xl text-foreground/50">R$</span>
        <span className="text-6xl">1.234</span>
        <span className="text-4xl">,56</span>
      </div>
    </section>
  );
};

export { ExpenseSummary };
