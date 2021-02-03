import LoadingSpinner from "../components/loadingSpinner";

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="w-full bg-white rounded-sm p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-8">Transactions</h2>
      {!transactions ? (
        <LoadingSpinner />
      ) : transactions.length === 0 ? (
        <p>There are no transactions yet!</p>
      ) : (
        <>
          <table className="border-collapse w-full">
            <thead className="bg-gray-100">
              <td className="font-bold p-2">Transaction Number</td>
              <td className="font-bold p-2">Item ID</td>
              <td className="font-bold p-2">Item Category</td>
              <td className="font-bold p-2">Price</td>
              <td className="font-bold p-2">Date</td>
              <td className="font-bold p-2">Payment Type</td>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="p-2">{transaction.transaction_number}</td>
                  <td className="p-2">{transaction.item_id}</td>
                  <td className="p-2">{transaction.item_category}</td>
                  <td className="p-2">$ {transaction.price}</td>
                  <td className="p-2">{transaction.date}</td>
                  <td className="p-2">{transaction.payment_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TransactionsTable;
