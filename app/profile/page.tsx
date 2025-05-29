"use server";
import getAuthUser from "@/lib/getAuthUser";
import Item from "../componenets/Item";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import AnimateProfile from "../componenets/AnimateProfile";
import { FaUser } from "react-icons/fa";

const profile = async () => {
  const user = await getAuthUser();
  if (!user) {
    return (
      <div className="text-red-500 p-10 bg-gray-400 h-dvh flex justify-center items-center">
        You are not logged in
      </div>
    );
  }
  console.log("User in profile page:", user);
  const userinfo = await getCollection("users");
  const userdata = await userinfo.findOne({
    _id: ObjectId.createFromHexString(user?.userId),
  });
  console.log("User data:", userdata?.username);

  // show user products
  const productCollection = await getCollection("products");
  const userProducts = await productCollection
    .find({ userId: ObjectId.createFromHexString(user.userId) })
    .toArray();
  console.log("User products:", userProducts);
  return (
    <div className="profile  flex flex-col items-center justify-center gap-5 ">
      <div className="profile-hero h-dvh flex items-center justify-center w-full">
        <AnimateProfile name={userdata?.username} />
      </div>
      <div className="your-profile w-fit p-5 bg-gray-300 shadow rounded-2xl flex flex-col  ">
        <div className="avatar flex justify-center pb-2 border-b border-solid w-full">
          <FaUser />
        </div>
        <div className="info fle flex-col ">
          <p className="text-lg">
            <span className="font-semibold">Username :</span>{" "}
            {userdata?.username}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email :</span> {userdata?.email}
          </p>
        </div>
      </div>
      <div className="your-products py-5 flex flex-col items-center justify-center gap-5">
        <h2 className="text-2xl">Your Products</h2>
        <div className="shadow  flex px-5 flex-wrap gap-5 justify-center ">
          {userProducts.map((p) => (
            <Item key={p._id} fakeproduct={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default profile;
