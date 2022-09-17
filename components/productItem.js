import React from "react"
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css'

export default function ProductItem({ product }) {
    return (
        <div className="card">
            <Link href={`/product/${product.slug}`}>
                <a>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded card"
                    />
                </a>
            </Link>
            <div>
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <h2 className="text-lg">{product.name}</h2>
                    </a>
                </Link>
                <p className="mb-2">{product.publisher}</p>
                <div className="flex justify-between w-full">
                    <p className="text-xl">R$ {product.price}</p>
                    <button
                        className="primary-button"
                        type="button">
                        <i class="ri-shopping-cart-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}