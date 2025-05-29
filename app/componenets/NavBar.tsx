"use server";
import BasicMenu from "./Categories";
import TemporaryDrawer from "./Drawer";
import NavLink from "./NavLink";
import CartIcon from "./CartIcon";
import getAuthUser from "@/lib/getAuthUser";
import { logout } from "@/action/auth";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

const NavBar = async () => {
  const authUser = await getAuthUser();

  return (
    <nav className=" border-b border-solid border-white absolute w-full h-20 flex justify-around items-center z-10 max-sm:text-xs ">
      <div className="logo ">
        <h1 className="text-4xl text-white max-sm:text-2xl">Fashion</h1>
      </div>

      <div className="flex gap-5 items-center">
        <TemporaryDrawer />

        <div className="flex gap-10 border-r border-r-white border-solid pr-5 max-md:hidden ">
          <NavLink href="/" label="Home" />

          <NavLink href="/contact" label="Contact" />
          <NavLink href="/about" label="About" />

          <BasicMenu />
        </div>
        {authUser ? (
          <div className="flex gap-3">
            <form action={logout}>
              <button className="btn">Log Out</button>
            </form>
            <NavLink href="/addproduct" label="Add Product" />
            <CartIcon />
            <Link href={"/profile"}>
              <FaUser className="text-xl text-white max-sm:text-2xl hover:text-blue-900" />
            </Link>
          </div>
        ) : (
          <NavLink href="/signup" label="Sign Up" />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
