import CategoriesPage from "../componenets/CategoriesPage";
import WrapperItems from "../componenets/WrapperItems";
import Item from "../componenets/Item";
import { getCollection } from "@/lib/db";

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

type Object = {
  category: string;
  discription: string;
  id: number;
  image: string;
  price: string;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};
type newObject = {
  category: string;
  description: string;
  price: string;
  title: string;
  userId: string;
  _id: string;
};
const Men = async () => {
  // product data from fake store API
  const products = await getProducts();
  if (!products || products.length === 0) {
    return <div className="text-center text-white">No products available</div>;
  }

  // product data from MongoDB
  const addedProducts = await getCollection("products");
  const addedProductsData = await addedProducts.find().toArray();

  if (addedProductsData.length === 0) {
    return <div className="text-center text-white">No products available</div>;
  }
  console.log(addedProductsData);

  return (
    <div className="products bg-gray-700">
      <CategoriesPage title="All Products">
        <WrapperItems>
          {products.map((p: Object) => (
            <Item key={p.id} fakeproduct={p} />
          ))}
        </WrapperItems>
      </CategoriesPage>
      <CategoriesPage title="Products added by users">
        <WrapperItems>
          {addedProductsData.map((p) => {
            const userProduct: newObject = {
              category: p.category ?? "",
              description: p.description ?? "",
              price: p.price?.toString() ?? "",
              title: p.title ?? "",
              userId: p.userId ?? "",
              _id: p._id.toString(),
            };
            return <Item key={userProduct._id} fakeproduct={p} />;
          })}
        </WrapperItems>
      </CategoriesPage>
    </div>
  );
};

export default Men;
