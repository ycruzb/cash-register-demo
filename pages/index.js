import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import TransactionTable from "../components/transactionsTable";
import Link from "next/link";
import LoadingSpinner from "../components/loadingSpinner";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const Home = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  const { data, errorData } = useSWR(`/api/transactions`, fetcher);

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
        <LoadingSpinner />
      ) : session ? (
        <div className="container mx-auto px-4">
          <Link href="/transaction/add">
            <a className="inline-block w-auto bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition duration-200 ease-linear mb-4">
              Add Transaction
            </a>
          </Link>
          {errorData ? (
            <p>Error getting transactions, Please try again!</p>
          ) : (
            <TransactionTable transactions={data.transactions} />
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Home;
