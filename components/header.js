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
