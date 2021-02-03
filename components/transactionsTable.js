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
              <tr>
                <th className="font-bold p-2 text-left">Transaction Type</th>
                <th className="font-bold p-2 text-left">Transaction Number</th>
                <th className="font-bold p-2 text-left">Item ID</th>
                <th className="font-bold p-2 text-left">Item Category</th>
                <th className="font-bold p-2 text-left">Price</th>
                <th className="font-bold p-2 text-left">Date</th>
                <th className="font-bold p-2 text-left">Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td
                    className={
                      transaction.transaction_type == "Purchase"
                        ? "p-2 text-red-600"
                        : "p-2 text-green-600"
                    }
                  >
                    {transaction.transaction_type}
                  </td>
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
