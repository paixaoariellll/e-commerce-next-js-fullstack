import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Product from '../../models/Product'
import db from '../../utils/db'
import { Store } from '../../utils/Store'
import imgErro from '../../public/img/imgErro.svg'
import axios from 'axios'

export default function ProductScreen(props) {
    const { product } = props
    const { state, dispatch } = useContext(Store)
    const router = useRouter()
    if (!product) {
        return (
            <Layout title="Produto não encontrado">
                <div className='text-3xl flex items-center flex-col text-center'>
                    <h1 className='text-indigo-700'>Que pena! você se perdeu!</h1>
                    <div className='flex text-center'>
                        <Image
                            src={imgErro}
                            alt="imagem do produto"
                            width={500}
                            height={500}
                        ></Image>
                        <Link href="/">
                            <button className=' bg-gray-300 text-gray-800 hover:bg-red-700'> Voltar</button>
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }
    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1
        const { data } = await axios.get(`/api/products/${product._id}`)
        if (data.countInStock < quantity) {
            return (
                toast.error(
                    <span className='p-2 text-red-500'>
                        O produto está indisponível!
                    </span>
                )
            )
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
                        <button className='bg-white border border-solid border-gray-300'>Voltar</button>
                    </Link>
                </div>
                <div className='w-full bg-transparent flex items-center flex-col'>
                    <h1 className='container shadow-md mt-4 rounded-xl bg-white w-fit text-blue-800 px-6 py-0 text-center text-4xl uppercase'>{product.name}</h1>
                </div>
            </div>
            <div className='grid md:grid-cols-5 md:gap-4'>
                <div className='md:col-span-2 mb-5 shadow-gray-900 shadow-xl rounded border-8'>
                    <Image
                        src={product.image}
                        alt="imagem do produto"
                        width={640}
                        height={640}
                        layout="responsive"
                    >
                    </Image>
                </div>
                <div className='col-span-3'>
                    <div className='col-span-3 flex justify-between'>
                        <div className='text-xl w-3/5'>
                            <ul>
                                <li className='text-center text-3xl shadow-md bg-white rounded-xl m-1 py-2 cursor-text text-green-700'>
                                    {product.category}
                                </li>
                                <li className='text-center m-1 cursor-text text-green-700'>
                                    Distribuidoras: {product.publisher}
                                </li>
                                <li className='text-center m-1 cursor-text text-green-700'>
                                    {product.rating} de {product.numReviews} avalizações
                                </li>
                                <li className='text-center m-1 cursor-text text-green-700'>
                                    Título: {product.title}
                                </li>
                                <li className='text-center m-1 cursor-text text-green-700'>
                                    Gênero: {product.gender}
                                </li>
                            </ul>
                        </div>
                        <div className='w-2/5'>
                            <div className='p-6 card bg-white'>
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
                                <div className='flex mt-7 text-xl text-center '>
                                    <button onClick={addToCartHandler} className='w-full bg-white flex justify-between border border-solid border-gray-300'>
                                        Comprar
                                        <i className="ri-shopping-cart-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <ul>
                            <li className='text-center text-sm px-4 shadow-md bg-white rounded-xl m-1 cursor-text'>
                                <thead className='flex text-xl justify-center text-center w-full'>Descrição:</thead>
                                <span className='px-5 text-lg'>{product.description}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        </Layout >
    )
}

export async function getServerSideProps(context) {
    const { params } = context
    const { slug } = params

    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        },
    }
}
