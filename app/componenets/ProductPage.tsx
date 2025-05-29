"use server";
import Image from "next/image";
import img from "@/public/black-friday-shopping.jpg";
import ProductDetails from "./ProductDetails";
import { getCollection } from "@/lib/db";
import Item from "./Item";
import { WithId, Document } from "mongodb";

// Function to fetch products from the fake store API
async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "force-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

//  types for fakestore products

type Object = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: string;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};

//  types for user products
type newObject = {
  category: string;
  description: string;
  price: string;
  title: string;
  image: string;
  userId: string;
  _id: string;
};

const ProductPage = async ({ id }: { id: string }) => {
  // fake store products
  const products: Object[] = await getProducts();
  const product = products.find((p) => p.id === +id);
  // userproducts
  const addedProducts = await getCollection("products");
  const rawAddedProducts = await addedProducts.find().toArray();
  const addedProductsData: newObject[] = rawAddedProducts.map(
    (doc: WithId<Document>) => ({
      category: doc.category,
      description: doc.description,
      price: doc.price,
      title: doc.title,
      image: doc.image,
      userId: doc.userId.toString(),
      _id: doc._id.toString(),
    })
  );
  const userProduct = addedProductsData.find((p) => p._id === id);
  //  check if two products exist
  if (!product && !userProduct) {
    return (
      <div className="text-red-500 p-10 bg-gray-400 h-dvh flex justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="product-page flex flex-col items-center justify-center gap-10">
      <div className=" w-full pt-30 flex justify-center pb-15 bg-[url(/product-cover.jpg)] bg-no-repeat bg-cover   text-white">
        <div className="cont backdrop-blur-lg bg-[#00000024] w-[85%] max-sm:flex-col rounded-3xl border border-black border-solid flex gap-5 p-3  items-center justify-between">
          <div className="product max-w-[450px] max-h-[465px] grid grid-cols-4 grid-rows-6 gap-y-4">
            <div className="main-screen overflow-hidden rounded-3xl row-span-full col-span-4">
              <Image
                className="w-full h-full"
                width={300}
                height={300}
                src={product?.image || userProduct?.image || img}
                alt={product?.title || userProduct?.title || "Product Image"}
              />
            </div>
            {product?.category === "electronics" ||
            product?.category === "jewelery" ||
            userProduct?.category === "jewelery" ||
            userProduct?.category === "electronics" ? null : (
              <div className="slider flex gap-5 row-span-2 col-span-4">
                <div className="slide  overflow-hidden rounded-3xl ">
                  <Image
                    className="w-full h-full"
                    width={300}
                    height={300}
                    src={product?.image || userProduct?.image || img}
                    alt={
                      product?.title || userProduct?.title || "Product Image"
                    }
                  />
                </div>
                <div className="slide  overflow-hidden rounded-3xl">
                  <Image
                    className="w-full h-full"
                    width={300}
                    height={300}
                    src={product?.image || userProduct?.image || img}
                    alt={
                      product?.title || userProduct?.title || "Product Image"
                    }
                  />
                </div>
                <div className="slide  overflow-hidden rounded-3xl">
                  <Image
                    className="w-full h-full"
                    width={300}
                    height={300}
                    src={product?.image || userProduct?.image || img}
                    alt={
                      product?.title || userProduct?.title || "Product Image"
                    }
                  />
                </div>
                <div className="slide  overflow-hidden rounded-3xl">
                  <Image
                    className="w-full h-full"
                    width={300}
                    height={300}
                    src={product?.image || userProduct?.image || img}
                    alt={
                      product?.title || userProduct?.title || "Product Image"
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div className="desc flex flex-col gap-3 justify-around h-full ">
            <div className="title flex flex-col gap-3">
              <h1 className="text-3xl font-semibold">
                {" "}
                {product?.title || userProduct?.title}{" "}
              </h1>
              <p className="text-gray-400 ">
                {" "}
                {product?.description || userProduct?.description}{" "}
              </p>
            </div>

            <div className="flex justify-between max-sm:flex-col ">
              <p>Category : {product?.category || userProduct?.category}</p>
              <p>Rate : {product?.rating.rate || "recently uploaded"}</p>
            </div>
            {(product || userProduct) && (
              <ProductDetails
                fakeproduct={(product as Object) || (userProduct as newObject)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="related-products">
        <h2 className="text-2xl font-semibold text-center">Related Products</h2>
        <div className="flex flex-wrap justify-center gap-5 p-5">
          {(products || addedProductsData)
            .filter(
              (p) => p.category === product?.category && p.id !== product.id
            )
            .slice(0, 4)
            .map((relatedProduct) => (
              <Item key={relatedProduct.id} fakeproduct={relatedProduct} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
