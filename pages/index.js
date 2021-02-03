import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import LoadingSpinner from "../components/loadingSpinner";
import useSWR from "swr";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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

  const dataPie = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
              <div className="w-full md:w-1/2 bg-white rounded-sm p-8 shadow-sm">
                <h3 className="text-sm font-bold mb-4 text-center md:text-left">
                  Sold by Store
                </h3>
                <div className="w-full h-48">
                  <ResponsiveContainer>
                    <BarChart
                      data={dataPie}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#8884d8" />
                      <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
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
