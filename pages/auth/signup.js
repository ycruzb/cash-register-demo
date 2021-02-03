import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Notification from "../../components/notification";
import Button from "../../components/button";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function SignUp() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const [sending, setSending] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationColor, setNotificationColor] = React.useState(
    "bg-red-600"
  );
  const [notificationMessage, setNotificationMessage] = React.useState(
    "Error, fill the form properly!"
  );

  const { data, errorData } = useSWR(`/api/stores`, fetcher);

  const onSubmit = async (data, e) => {
    setSending(true);
    const res = await fetch("/api/auth/signup", {
      method: "post",
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      // chequear la data aqui y si viene error asignarlo y mostrarlo sino redirigir a login
      //console.log(res);
      setSending(false);

      setNotificationMessage(
        "You've signed up properly, redirecting to sign in..."
      );
      setNotificationColor("bg-green-600");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        setTimeout(() => {
          router.push("/auth/signin");
        }, 1000);
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

  return (
    <>
      <Head>
        <title>Sign Up | CURB Cash Register Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Notification
        text={notificationMessage}
        bgColor={notificationColor}
        show={showNotification}
      />
      <div className="py-8 px-8 container mx-auto max-w-screen-sm bg-white rounded-sm shadow-sm">
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <h2 className="text-3xl font-semibold text-center mb-4">Sign Up</h2>
          <label htmlFor="name" className="block w-full mb-2">
            Name
          </label>
          <input
            className="block w-full mb-4 bg-gray-100 p-2"
            id="name"
            name="name"
            type="text"
            ref={register}
            required={true}
            autoComplete="name-off"
          />
          <label htmlFor="lastname" className="block w-full mb-2">
            Last Name
          </label>
          <input
            className="block w-full mb-4 bg-gray-100 p-2"
            id="lastname"
            name="lastname"
            type="text"
            ref={register}
            required={true}
            autoComplete="lastname-off"
          />
          <label htmlFor="phone" className="block w-full mb-2">
            Phone
          </label>
          <input
            className="block w-full mb-4 bg-gray-100 p-2"
            id="phone"
            name="phone"
            ref={register}
            type="tel"
            autoComplete="phone-off"
          />
          <label htmlFor="email" className="block w-full mb-2">
            Email
          </label>
          <input
            className="block w-full mb-4 bg-gray-100 p-2"
            id="email"
            name="email"
            type="email"
            ref={register}
            required={true}
            autoComplete="email-off"
          />
          <label htmlFor="password" className="block w-full mb-2">
            Password
          </label>
          <input
            className="block w-full bg-gray-100 p-2 mb-4"
            id="password"
            name="password"
            type="password"
            ref={register}
            required={true}
            autoComplete="off"
          />
          <label htmlFor="store_id" className="block w-full mb-2">
            Store
          </label>
          {errorData && (
            <p className="p-2 mb-4">Error getting Stores, try again! </p>
          )}
          {!data && <p className="p-2 mb-4">Loading stores, please wait...</p>}
          {data && (
            <select
              className="block w-full bg-gray-100 p-2 mb-4"
              id="store_id"
              name="store_id"
              ref={register}
              required={true}
            >
              {data &&
                data.stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
            </select>
          )}

          <Button
            type="submit"
            text={!sending ? "Sign Up" : "Sending..."}
            disabled={sending || errorData || !data}
            onClick={null}
            widthClass="w-full"
          />
          <p>
            Have an account?{" "}
            <Link className="underline font-semibold" href="/auth/signin">
              <a className="font-semibold">Sign In</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
