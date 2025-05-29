import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa";
const Footer = () => {
  return (
    <section className="flex flex-col justify-between items-center bg-blue-950 text-white h-70  py-5">
      <div className="flex w-full justify-evenly gap-20">
        <div className="flex flex-col gap-5">
          <h2>Company</h2>
          <div className="links flex flex-col gap-3">
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About Us</Link>
            <Link href={"/contact"}>Contact</Link>
            <p>Policy</p>
          </div>
        </div>
        <div className="grt">
          <h1>Get In Touch</h1>
          <div className="links">
            <p className="text-gray-500">+123-358-365</p>
            <p className="text-gray-500">fashion@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 max-sm:text-xs">
        <FaRegCopyright />
        <p className="text-gray-500">
          Copy Right 2025{" "}
          <span className="text-blue-600 text-lg hover:underline">
            <Link href={"/"}>fashion.com</Link>
          </span>{" "}
          All rights are reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
