import React from "react"
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css'
import Image from "next/image"
import { toast } from "react-toastify"

export default function productItem({ product, addToCartHandler }) {
    return (
        <div className="card p-5 hover:-translate-y-2">
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
                <p className="mb-2 ml-3 text-blue-800">Distribuidora: <span className="text-blue-800">{product.publisher}</span> </p>
                <div className="text-center text-blue-800 text-sm">Restam:{product.countInStock}</div>
                <div className="flex justify-between w-full">
                    <div className='flex items-center flex-col ml-2'>
                        <span className='text-sm text-red-500 line-through'>de: R$&nbsp;
                            {product.price}</span>
                        <span className='text-xl text-green-600'>por: R$&nbsp;
                            {product.price * 0.9}</span>
                    </div>
                    <div>
                        {product.countInStock > 0 ? (
                            <button
                                className="primary-button border border-solid border-gray-300"
                                type="button"
                                onClick={() => addToCartHandler(product)}
                            >
                                <i className="ri-shopping-cart-line"></i>
                            </button>
                        ) : (
                            <button
                                className="primary-button bg-gray-300 border border-solid cursor-not-allowed border-gray-300"
                                type="button"
                                onClick={() => toast.error('Produto indisponível')}
                            >
                                <i className="ri-shopping-cart-line text-red-600"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}