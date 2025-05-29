"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();

  return (
    <Link className={`btn ${pathname === href ? "active" : ""}`} href={href}>
      {label}
    </Link>
  );
};

export default NavLink;
