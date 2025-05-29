import CategoriesPage from "../componenets/CategoriesPage";
import { IoMdWoman } from "react-icons/io";
import WrapperItems from "../componenets/WrapperItems";
import Item from "../componenets/Item";

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "force-cache", // كاش دائم، مناسب للبيانات الثابتة
      // أو cache: "no-store" لو عايز تحديث دايم
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
const Women = async () => {
  const products = await getProducts();
  const newCollectionProducts = products.slice(16, 20);
  return (
    <div className="women background-edit">
      <CategoriesPage title="Women" icon={<IoMdWoman />}>
        <WrapperItems>
          {newCollectionProducts.map((p: Object) => (
            <Item key={p.id} fakeproduct={p} />
          ))}
        </WrapperItems>
      </CategoriesPage>
    </div>
  );
};

export default Women;
