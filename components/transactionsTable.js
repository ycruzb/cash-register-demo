import LoadingSpinner from "../components/loadingSpinner";

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="w-full bg-white rounded-sm p-8 shadow-sm">
      {!transactions ? (
        <LoadingSpinner />
      ) : transactions.length === 0 ? (
        <p>There are no transactions yet!</p>
      ) : (
        <>
          <table className="border-collapse">
            <thead className="bg-gray-50">
              <tr>Transaction Number</tr>
              <tr>Item ID</tr>
              <tr>Item Category</tr>
              <tr>Price</tr>
              <tr>Date</tr>
              <tr>Payment Type</tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction.transaction_number}</td>
                  <td>{transaction.item_id}</td>
                  <td>{transaction.item_category}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.payment_type}</td>
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
