import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import Button from "../../components/button";
import { useForm } from "react-hook-form";

const Home = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [transactions, setTransactions] = React.useState([]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  React.useEffect(() => {
    //console.log(session, loading);
    if (session === null) {
      router.push("/auth/signin");
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Add Transaction | CURB Cash Register Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <div className="w-full flex justify-center align-middle">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600 mx-auto block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : session ? (
        <div className="container mx-auto px-4">
          <Link href="/">
            <a className="inline-block w-auto bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition duration-200 ease-linear mb-4">
              View All Transactions
            </a>
          </Link>
          <div className="w-full bg-white rounded-sm p-8 shadow-sm">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-semibold mb-8">Add Transaction</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="">
                  <label
                    htmlFor="transaction_number"
                    className="block w-full mb-2"
                  >
                    Transaction Number
                  </label>
                  <input
                    className="block w-full mb-4 bg-gray-50 p-2"
                    id="transaction_number"
                    name="transaction_number"
                    type="text"
                    ref={register}
                    required={true}
                  />
                </div>

                <div className="">
                  <label htmlFor="item_id" className="block w-full mb-2">
                    Item Id
                  </label>
                  <input
                    className="block w-full mb-4 bg-gray-50 p-2"
                    id="item_id"
                    name="item_id"
                    type="text"
                    ref={register}
                    required={true}
                  />
                </div>

                <div className="">
                  <label htmlFor="item_category" className="block w-full mb-2">
                    Item Category
                  </label>
                  <select
                    className="block w-full bg-gray-50 p-2 mb-4"
                    id="item_category"
                    name="item_category"
                    ref={register}
                    required={true}
                  >
                    <option value="Groceries">Groceries</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Farm Item">Farm Item</option>
                  </select>
                </div>

                <div className="">
                  <label htmlFor="price" className="block w-full mb-2">
                    Price
                  </label>
                  <input
                    className="block w-full mb-4 bg-gray-50 p-2"
                    id="price"
                    name="price"
                    type="text"
                    ref={register}
                    required={true}
                  />
                </div>

                <div className="">
                  <label htmlFor="date" className="block w-full mb-2">
                    Date
                  </label>
                  <input
                    className="block w-full mb-4 bg-gray-50 p-2"
                    id="date"
                    name="date"
                    type="date"
                    ref={register}
                    required={true}
                  />
                </div>

                <div className="">
                  <label htmlFor="payment_type" className="block w-full mb-2">
                    Payment Type
                  </label>
                  <select
                    className="block w-full bg-gray-50 p-2 mb-4"
                    id="payment_type"
                    name="payment_type"
                    ref={register}
                    required={true}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <Button
                  type="submit"
                  text={"Add"}
                  disabled={false}
                  onClick={null}
                  widthClass="w-auto mt-4"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p className="w-full text-center">Loading...</p>
      )}
    </>
  );
};

export default Home;
