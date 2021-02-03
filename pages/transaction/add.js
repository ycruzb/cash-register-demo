import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import Button from "../../components/button";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/loadingSpinner";
import Notification from "../../components/notification";

const Home = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  const [sending, setSending] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationColor, setNotificationColor] = React.useState(
    "bg-green-600"
  );
  const [notificationMessage, setNotificationMessage] = React.useState(
    "Transaction added successfully!"
  );

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    setSending(true);

    const res = await fetch("/api/transaction/add", {
      method: "post",
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      // chequear la data aqui y si viene error asignarlo y mostrarlo sino redirigir a login
      //console.log(res);
      setSending(false);
      e.target.reset();

      setNotificationMessage("Transaction added successfully!");
      setNotificationColor("bg-green-600");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } else {
      setSending(false);
      setNotificationMessage("Error, fill the form properly!");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }
  };

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
      <Notification
        text={notificationMessage}
        bgColor={notificationColor}
        show={showNotification}
      />
      {loading ? (
        <LoadingSpinner />
      ) : session ? (
        <div className="container mx-auto px-4">
          <Link href="/transactions">
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
                    htmlFor="transaction_type"
                    className="block w-full mb-2"
                  >
                    Transaction Type
                  </label>
                  <select
                    className="block w-full bg-gray-100 p-2 mb-4"
                    id="transaction_type"
                    name="transaction_type"
                    ref={register}
                    required={true}
                  >
                    <option value="Purchase">Purchase</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>

                <div className="">
                  <label
                    htmlFor="transaction_number"
                    className="block w-full mb-2"
                  >
                    Transaction Number
                  </label>
                  <input
                    className="block w-full mb-4 bg-gray-100 p-2"
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
                    className="block w-full mb-4 bg-gray-100 p-2"
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
                    className="block w-full bg-gray-100 p-2 mb-4"
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
                    className="block w-full mb-4 bg-gray-100 p-2"
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
                    className="block w-full mb-4 bg-gray-100 p-2"
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
                    className="block w-full bg-gray-100 p-2 mb-4"
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
              <input
                type="hidden"
                ref={register}
                name="user_id"
                value={session.user.user_id}
              />
              <input
                type="hidden"
                ref={register}
                name="store_id"
                value={session.user.store_id}
              />
              <div className="w-full flex justify-start">
                <Button
                  type="submit"
                  text={!sending ? "Add" : "Sending..."}
                  disabled={sending}
                  onClick={null}
                  widthClass="w-auto mt-4"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Home;
