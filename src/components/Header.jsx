import React from "react";
import { useSelector } from "react-redux";
import { Button, LogoutButton } from "./index";
import { Link } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      path: "/home",
      active: authStatus,
      // active: true,
    },
    {
      name: "SignUp",
      path: "/signup",
      active: !authStatus,
      // active: true,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
      // active: true,
    },
  ];
  return (
    <header className="Header p-3 flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:p-7 text-white bg-zinc-800 w-full h-auto">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">blogPosted</h1>
      </nav>
      <div className="flex items-center p-2">
        <ul className="flex items-center gap-8">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <Link to={item.path}>
                  <Button clasName="rounded-xl">{item.name}</Button>
                </Link>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutButton clasName="rounded-xl"></LogoutButton>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
