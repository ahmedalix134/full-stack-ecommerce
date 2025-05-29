import getAuthUser from "@/lib/getAuthUser";
import img from "@/public/black-friday-shopping.jpg";
import Image from "next/image";

const Offers = async () => {
  const authUser = await getAuthUser();
  return (
    <div className=" group relative h-[50vh] bg-amber-600 bg-cover bg-no-repeat overflow-hidden">
      <button
        disabled={!authUser}
        className=" z-2 absolute peer top-[50%]  left-[50%] cursor-pointer -translate-[50%] bg-white rounded-full p-5 text-xl font-semibold max-sm:text-sm"
      >
        {authUser ? "Get Offers" : "Sign Up to Get Offers"}
      </button>
      <Image
        src={img}
        alt="hero "
        className=" h-full peer-hover:brightness-[0.5] duration-150"
      />
    </div>
  );
};

export default Offers;
