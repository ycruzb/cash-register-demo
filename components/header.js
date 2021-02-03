import { useSession, signOut } from "next-auth/client";
import Link from "next/link";

const Header = () => {
  const [session, loading] = useSession();

  return (
    <header className="bg-white shadow-md py-2">
      <div className="container mx-auto flex px-4 py-2 justify-between">
        <h1>
          <Link href="/">
            <a className="font-bold">CURB Cash Register</a>
          </Link>
        </h1>
        <div>
          {session && !loading && (
            <>
              <span className="pr-4 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 inline-block"
                  style={{ marginTop: "-4px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{" "}
                {session.user.name} {session.user.lastname}
              </span>
              <button
                className="text-red-600 border-none"
                title="Sign Out"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
