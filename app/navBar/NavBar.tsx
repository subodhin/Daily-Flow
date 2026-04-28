import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="w-60 h-screen flex flex-col gap-4 p-6 border-r bg-blue-500 text-white font-semibold">
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/mgoals">Monthly Goals</Link>
    </nav>
  );
};

export default NavBar;
