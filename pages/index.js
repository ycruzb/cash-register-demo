import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import TransactionTable from "../components/transactionsTable";
import Link from "next/link";

const Home = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    //console.log(session, loading);
    if (session === null) {
      router.push("/auth/signin");
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>CURB Cash Register Demo</title>
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
          <Link href="/transaction/add">
            <a className="inline-block w-auto bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition duration-200 ease-linear mb-4">
              Add Transaction
            </a>
          </Link>
          <TransactionTable transactions={transactions} />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Home;
