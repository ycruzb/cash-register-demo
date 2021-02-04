import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import LoadingSpinner from "../components/loadingSpinner";
import useSWR from "swr";

import CustomBarChart from "../components/CustomBarChart";

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

  const { data, errorData } = useSWR(`/api/dashboard`, fetcher);

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
          {errorData ? (
            <p>Error getting transactions, Please try again!</p>
          ) : !data ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex flex-col gap-8 md:flex-row mb-6">
                <div className="w-full md:w-1/3 bg-white rounded-sm p-8 shadow-sm">
                  <h3 className="text-sm font-bold mb-4 text-center md:text-left">
                    Purchases
                  </h3>
                  <p className="text-red-600 font-semibold text-3xl text-center md:text-left">
                    ${" "}
                    {/*data.transactions
                      .filter((item) => item.transaction_type === "Purchase")
                      .reduce((acc, item) => acc + item.price, 0)
					.toFixed(2)*/}
                    {data.totalPurchase[0].total}
                  </p>
                </div>
                <div className="w-full md:w-1/3 bg-white rounded-sm p-8 shadow-sm">
                  <h3 className="text-sm font-bold mb-4 text-center md:text-left">
                    Sold
                  </h3>
                  <p className="text-green-600 font-semibold text-3xl text-center md:text-left">
                    ${" "}
                    {/*data.transactions
                      .filter((item) => item.transaction_type === "Sold")
                      .reduce((acc, item) => acc + item.price, 0)
					.toFixed(2)*/}
                    {data.totalSold[0].total}
                  </p>
                </div>
                <div className="w-full md:w-1/3 bg-white rounded-sm p-8 shadow-sm">
                  <h3 className="text-sm font-bold mb-4 text-center md:text-left">
                    Transactions
                  </h3>
                  <p className="text-blue-600 font-semibold text-3xl text-center md:text-left">
                    {/*data.transactions.length*/}
                    {data.transactionsCount}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-white rounded-sm p-8 shadow-sm">
                <h3 className="text-sm font-bold mb-4 text-center md:text-left">
                  Sold by Store
                </h3>
                <div className="w-full h-96">
                  <CustomBarChart data={data.storesData} />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Home;
