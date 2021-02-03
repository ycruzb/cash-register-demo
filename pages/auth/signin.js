import { csrfToken } from "next-auth/client";
import Link from "next/link";
import Head from "next/head";
import React from "react";
import Notification from "../../components/notification";
import Button from "../../components/button";

export default function SignIn({ csrfToken, signinFail }) {
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    if (signinFail) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    }
  }, [signinFail]);
  return (
    <>
      <Head>
        <title>Sign In | CURB Cash Register Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Notification
        text="Error! wrong credentials, try again!"
        bgColor="bg-red-600"
        show={showError}
      />
      <div className="py-8 px-8 container mx-auto max-w-screen-sm bg-white rounded-sm shadow-sm">
        <form
          className="w-full"
          method="post"
          action="/api/auth/callback/credentials"
        >
          <h2 className="text-3xl font-semibold text-center mb-4">Sign In</h2>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label htmlFor="email" className="block w-full mb-2">
            Email
          </label>
          <input
            className="block w-full mb-4 bg-gray-100 p-2"
            id="email"
            name="email"
            type="email"
            required={true}
          />
          <label htmlFor="password" className="block w-full mb-2">
            Password
          </label>
          <input
            className="block w-full bg-gray-100 p-2 mb-4"
            id="password"
            name="password"
            type="password"
            required={true}
          />

          <Button
            type="submit"
            text="Sign In"
            disabled={false}
            onClick={null}
            widthClass="w-full"
          />
          <p>
            Don't have an account?{" "}
            <Link className="underline font-semibold" href="/auth/signup">
              <a className="font-semibold">Sign Up</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

SignIn.getInitialProps = async (context) => {
  const signinFail = context.query.callbackUrl;

  return {
    csrfToken: await csrfToken(context),
    signinFail: signinFail,
  };
};
