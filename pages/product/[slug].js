import data from '../../utils/data'
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Store } from '../../utils/Store'

export default function ProductScreen() {
    const { state, dispatch } = useContext(Store)
    const { query } = useRouter()
    const { slug } = query
    const router = useRouter()
    const product = data.products.find((x) => x.slug === slug)
    if (!product) {
        return (
            <div>
                O produto não existe, Ore!
            </div>
        )
    }
    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product.countInStock < quantity) {
            alert('Não tem mais produto, ORE!')
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        })
        router.push('/cart')
    }
    return (
        <Layout title={product.name}>
            <div className='py-2'>
                <Link href="/">
                    Voltar
                </Link>
            </div>
            <div className='basis'>
                <div className='basis-1/2 grid md:grid-cols-4 md:gap-3'>
                    <div className='md:col-span-2'>
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={640}
                            height={640}
                            layout="responsive"
                        >
                        </Image>
                    </div>
                </div>
                <div className='basis-1/2 card' >
                    <ul>
                        <li>
                            <h1>
                                {product.name}
                            </h1>
                        </li>
                        <li>
                            {product.category}
                        </li>
                        <li>
                            {product.publisher}
                        </li>
                        <li>
                            {product.rating} de {product.numReviews} compras
                        </li>
                        <li>
                            Descrição: {product.description}
                        </li>
                    </ul>
                </div>
            </div>
        </Layout >
    )
}
