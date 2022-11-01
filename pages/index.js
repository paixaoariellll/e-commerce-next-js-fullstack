import axios from "axios";
import db from "../utils/db";
import Layout from "../components/Layout";
import Product from "../models/Product";
import ProductItem from "../components/productItem";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import { useContext } from "react";
/* import Hero from "../components/Hero"; */

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Este produto está esgotado!");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("O produto foi adicionado ao carrinho!");
  };

  return (
    <Layout title="Home">
      {/*       <h1 className="text-5xl text-blue-700 my-5 card p-5 text-center w-full">
        {" "}
        Jogos Em Destaque
      </h1>
      <Hero /> */}
      <h1 className="text-5xl text-blue-700 my-5 card p-5 text-center w-full">
        {" "}
        Games disponíveis
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
