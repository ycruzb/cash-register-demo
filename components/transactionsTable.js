const TransactionsTable = ({ transactions }) => {
  return (
    <div className="w-full bg-white rounded-sm p-8 shadow-sm">
      {transactions.length === 0 && <p>There are no transactions yet!</p>}
    </div>
  );
};

export default TransactionsTable;
