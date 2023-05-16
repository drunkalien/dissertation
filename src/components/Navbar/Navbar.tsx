import { useCurrentUser } from "@/hooks";
import { Roles, User } from "@/models";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data } = useCurrentUser();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token") || "");
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <nav className="p-10 max-w-7xl mx-auto">
      {token ? (
        <ul className="flex gap-7 items-center">
          <li className="hover:text-blue-600">
            <Logo />
          </li>
          <li className="hover:text-blue-600">
            <Link href="/">Products</Link>
          </li>
          {user?.role === Roles.ADMIN && (
            <>
              <li className="hover:text-blue-600">
                <Link href="/users">Users</Link>
              </li>
              <li className="hover:text-blue-600">
                <Link href="/create-user">Create User</Link>
              </li>
            </>
          )}
        </ul>
      ) : (
        <Link href="/signIn">Sign In</Link>
      )}
    </nav>
  );
};

export default Navbar;

const Logo = () => {
  return (
    <Link href="/" className="font-bold text-lg">
      WMS
    </Link>
  );
};
