import "../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <>
        <Header />
        <main className="py-8 px-4 bg-gray-100">
          <Component {...pageProps} />
        </main>
        <Footer />
      </>
    </Provider>
  );
}

export default MyApp;
