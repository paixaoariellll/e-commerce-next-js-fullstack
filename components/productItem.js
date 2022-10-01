import React from "react"
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css'
import Image from "next/image";

export default function productItem({ product, addToCartHandler }) {
    return (
        <div className="card">
            <Link href={`/product/${product.slug}`}>
                <div className="cursor-pointer">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        unoptimized
                        className="rounded card"
                    />
                </div>
            </Link>
            <div className="mx-2">
                <Link href={`/product/${product.slug}`}>
                    <h2 className="text-lg">{product.name}</h2>
                </Link>
                <p className="mb-2">{product.publisher}</p>
                <div className="flex justify-between w-full">
                    <p className="text-xl">R$ {product.price}</p>
                    <button
                        className="primary-button"
                        type="button"
                        onClick={() => addToCartHandler(product)}
                    >
                        <i className="ri-shopping-cart-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}