import React from "react"
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css'
import Image from "next/image"

export default function ProductItem({ product, addToCartHandler }) {
    return (
        <div className="card">
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
                <p className="mb-2 ml-3 text-blue-800">Publicante: <span className="text-blue-800">{product.publisher}</span> </p>
                <div className="flex justify-between w-full">
                    <div className='flex items-center flex-col ml-2'>
                        <span className='text-sm text-red-500 line-through'>de: R$&nbsp;
                            {product.price}</span>
                        <span className='text-xl text-green-600'>por: R$&nbsp;
                            {product.price * 0.9}</span>
                    </div>
                    <div>
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
        </div>
    );
}