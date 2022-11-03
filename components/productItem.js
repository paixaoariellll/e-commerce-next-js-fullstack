import Image from "next/image";
import Link from "next/link";
import React from "react";
import "remixicon/fonts/remixicon.css";
import { toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai"


export default function productItem({ product, addToCartHandler }) {
  return (
    <div className="card p-5 hover:-translate-y-2">
      <p className="mb-2 ml-3 text-black">
        Distribuidora: <span>{product.publisher}</span>
      </p>
      <Link href={`/product/${product.slug}`}>
        <div className="cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded card w-full"
          />
        </div>
      </Link>
      <div className="mx-2">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-2xl text-center text-blue-800">{product.name}</h2>
        </Link>
        <div className="text-center text-black text-md">
          Restam: <span>{product.countInStock}</span>{" "}
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-center flex-col ml-2">
            <span className="text-sm text-red-600">
              <span className="text-black">de:</span>{" "}
              <span className="line-through">
                R$ &nbsp;{product.price.toFixed(2)}
              </span>
            </span>
            <span className="text-xl text-green-600">
              <span className="text-black">por:</span>{" "}
              <span>R$&nbsp;{(product.price * 0.9).toFixed(2)}</span>
            </span>
          </div>
          <div>
            {product.countInStock > 0 ? (
              <button
                className="primary-button !py-3 border border-solid border-gray-300"
                type="button"
                onClick={() => addToCartHandler(product)}
              >
                < AiOutlineShoppingCart />
              </button>
            ) : (
              <button
                className="primary-button !py-3 bg-white hover:bg-current border border-solid cursor-not-allowed border-gray-300"
                type="button"
                onClick={() => toast.error("Produto indisponível")}
              >
                <AiOutlineShoppingCart className="text-red-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
