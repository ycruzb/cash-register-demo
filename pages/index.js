import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import TransactionTable from "../components/transactionsTable";
import Link from "next/link";
import LoadingSpinner from "../components/loadingSpinner";
import useSWR from "swr";

import { PieChart, Pie, Sector, Cell } from "recharts";

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

  const dataPie = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
          <Link href="/transactions">
            <a className="inline-block w-auto bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition duration-200 ease-linear mb-4">
              Transactions
            </a>
          </Link>
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
                    {data.transactions
                      .filter((item) => item.transaction_type === "Purchase")
                      .reduce((acc, item) => acc + item.price, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="w-full md:w-1/3 bg-white rounded-sm p-8 shadow-sm">
                  <h3 className="text-sm font-bold mb-4 text-center md:text-left">
                    Sold
                  </h3>
                  <p className="text-green-600 font-semibold text-3xl text-center md:text-left">
                    ${" "}
                    {data.transactions
                      .filter((item) => item.transaction_type === "Sold")
                      .reduce((acc, item) => acc + item.price, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="w-full md:w-1/3 bg-white rounded-sm p-8 shadow-sm">
                  <h3 className="text-sm font-bold mb-4 text-center md:text-left">
                    Transactions
                  </h3>
                  <p className="text-blue-600 font-semibold text-3xl text-center md:text-left">
                    {data.transactions.length}
                  </p>
                </div>
              </div>
              <div className="w-full bg-white rounded-sm p-8 shadow-sm">
                <h3 className="text-sm font-bold mb-4 text-center md:text-left">
                  Sold by Store
                </h3>
                <PieChart
                  width={800}
                  height={400}
                  onMouseEnter={this.onPieEnter}
                >
                  <Pie
                    data={dataPie}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
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
