import data from '../../utils/data'
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Store } from '../../utils/Store'
import toast, { Toaster } from 'react-hot-toast'
import imgErro from '../../public/img/Saly-11.svg'

export default function ProductScreen() {
    const { state, dispatch } = useContext(Store)
    const { query } = useRouter()
    const { slug } = query
    const router = useRouter()
    const product = data.products.find((x) => x.slug === slug)
    if (!product) {
        return (
            <Layout title="Página não encontrada">
                <div className='text-5xl text-center'>
                    <h1>Você se perdeu!</h1>
                </div>
                <div className='flex text-center'>
                    <Image
                        src={imgErro}
                        width={500}
                        height={500}
                    ></Image>
                    <div className='text-9xl'>
                        Erro 404!
                        <div className='py-2 text-2xl text-center'>
                            <Link href="/">
                                <button className=' bg-white hover:bg-red-500'> Voltar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product.countInStock < quantity) {
            toast.error(
                <span className='p-2 text-red-500 text-2xl'>
                    O produto está indisponível!
                </span>
            )
            return
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        })
        router.push('/cart')
    }
    return (
        <Layout title={product.name}>
            <div className='flex'>
                <div className='py-2'>
                    <Link
                        href="/">
                        <button>Voltar</button>
                    </Link>
                </div>
                <h1 className='container mt-4 px-4 py-5 text-center text-3xl'>{product.name}</h1>
            </div>
            <div className='grid md:grid-cols-4 md:gap-3'>
                <div className='md:col-span-2 mb-5 shadow-gray-900 shadow-xl rounded border-8'>
                    <Image
                        src={product.image}
                        alt=""
                        width={640}
                        height={640}
                        layout="responsive"
                    >
                    </Image>
                </div>
                <div className='text-xl'>
                    <ul>
                        <li>
                            {product.category}
                        </li>
                        <li>
                            Criador: {product.publisher}
                        </li>
                        <li>
                            {product.rating} de {product.numReviews} avalizações
                        </li>
                        <li>
                            Descrição: {product.description}
                        </li>
                    </ul>
                </div>
                <div>
                    <div className='p-6 card'>
                        <div className='mb-2 flex justify-between'>
                            <div className='text-2xl' >Preço</div>
                            <div className='text-2xl text-red-600'>
                                {product.countInStock > 0 ? `R$ ${product.price}` : "Vendido"}
                            </div>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <div className='text-md'>Status</div>
                            <div>
                                {
                                    product.countInStock ?
                                        `restantes ${product.countInStock}` :
                                        <span className='text-red-600'> Indisponível</span>
                                }
                            </div>
                        </div>
                        <div className='flex mt-7 text-center '>
                            <button onClick={addToCartHandler} className='w-full bg-sky-100 flex justify-between'>
                                Comprar
                                <i className="ri-shopping-cart-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>
        </Layout >
    )
}
