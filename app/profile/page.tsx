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
  const userinfo = await getCollection("users");
  const userdata = await userinfo.findOne({
    _id: ObjectId.createFromHexString(user?.userId as string),
  });

  // show user products
  const productCollection = await getCollection("products");
  // show your orders
  const orderCollection = await getCollection("orders");
  // Define a type for your product documents
  type Product = {
    _id: ObjectId;
    category: string;
    price: number;
    title: string;
    userId: ObjectId;
    image: string;
    [key: string]: any;
  };
  type Order = {
    _id: ObjectId;
    userId: ObjectId;
    items: Product[];
    number: string;
    address: string;
  };

  const userProducts = (await productCollection
    .find({ userId: ObjectId.createFromHexString(user.userId as string) })
    .toArray()) as Product[];

  const userOrders = (await orderCollection
    .find({ userId: ObjectId.createFromHexString(user.userId as string) })
    .toArray()) as Order[];

  console.log("userOrders", userOrders);
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
            <Item
              key={p._id.toString()}
              fakeproduct={{
                ...p,
                _id: p._id.toString() as any,
                price: p.price.toString(),
              }}
            />
          ))}
        </div>
      </div>
      <div className="your-orders py-5 flex flex-col items-center justify-center gap-5 ">
        <h2 className="text-2xl">Your Orders</h2>
        <div className="shadow flex px-5 flex-wrap gap-5 justify-center">
          {userOrders.length === 0 ? (
            <p>you donnot have any orders yet </p>
          ) : (
            <div>
              {userOrders.map((o) => (
                <div
                  key={o._id.toString()}
                  className="order-item p-3 bg-gray-200 rounded shadow mb-3"
                >
                  <h3 className="text-lg font-semibold">
                    Order Number: {o.number}
                  </h3>
                  <p className="text-sm">Address: {o.address}</p>
                  <div className="order-items mt-2">
                    {o.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <span>
                          {item.title} ({item.size})
                        </span>
                        <span>
                          ${item.price} x {item.quantity}
                        </span>
                      </div>
                    ))}
                    <div className="deliver-fees flex justify-between border-b border-solid pb-2">
                      <p>delivery fees :</p>
                      <span> 3$ </span>
                    </div>
                    <div className="total flex justify-between ">
                      <p>Total :</p>
                      <span>
                        $
                        {(
                          o.items.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          ) + 3
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default profile;
