import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { getError } from '../utils/error'
import { Store } from '../utils/Store'

export default function PlaceOrderScreen() {
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { cartItems, shippingAddress, paymentMethod } = cart

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100
    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    ) // 123.4567 => 123.46
    const shippingPrice = itemsPrice > 200 ? 0 : 15
    const taxPrice = round2(itemsPrice * 0.15)
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    const descount = totalPrice * 0.9

    const router = useRouter()
    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment')
        }
    }, [paymentMethod, router])

    const [loading, setLoading] = useState(false)

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                descount,
            })
            setLoading(false)
            dispatch({ type: 'CART_CLEAR_ITEMS' })
            Cookies.set(
                'cart',
                JSON.stringify({
                    ...cart,
                    cartItems: [],
                })
            )
            router.push(`/order/R${data._id}`)
        } catch (err) {
            setLoading(false)
            toast.error(getError(err))
        }
    }

    return (
        <Layout title="Revisão do Pedido">
            <CheckoutWizard activeStep={3} />
            <h1 className="mb-4 text-center text-indigo-800 text-4xl">Revisão do Pedido</h1>
            {cartItems.length === 0 ? (
                <div className='card w-full p-5 bg-white'>
                    <h1 className="text-center text-red-500 text-3xl">Parece que você se perdeu né?</h1>
                    {
                        <div className="mb-4 text-xl text-center text-red-500">
                            Você não possui itens adicionados ao carrinho
                        </div>
                    }
                    <div className='text-center'>
                        <button
                            onClick={() => router.push('/')}
                            type="button"
                            className="primary-button text-xl"
                        >
                            Vamos às Compras!
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <div className="card bg-white text-center overflow-x-auto p-5">
                            <h2 className="mb-2 text-indigo-600 text-3xl">Lista dos Produtos</h2>
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr className='text-indigo-700 text-xl'>
                                        <th className="px-5 text-center">Item</th>
                                        <th className="p-5 text-center">Quantidade</th>
                                        <th className="p-5 text-center">Preço</th>
                                        <th className="p-5 text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item._id} className="border-y divide-indigo-600 border-indigo-600">
                                            <td>
                                                <Link href={`/product/R${item.slug}`}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                        className="cursor-pointer"
                                                    ></Image>
                                                </Link>
                                            </td>
                                            <td className="p-5 only:text-center">{item.quantity}</td>
                                            <td className="p-5 text-center">R${item.price}</td>
                                            <td className="p-5 text-center">
                                                R${item.quantity * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-between gap-x-5'>
                            <div className="card bg-white w-1/2 p-5">
                                <h2 className="mb-2 text-indigo-600 text-center text-3xl">Endereço para entrega</h2>
                                <div className='flex items-left flex-col justify-between gap-2 mb-2'>
                                    <span className='text-indigo-700'>Nome:&nbsp;
                                        <span className='text-black'>{shippingAddress.name}</span>
                                    </span>
                                    <span className='text-indigo-700'>Endereço:&nbsp;
                                        <span className='text-black'>{shippingAddress.address}</span>
                                    </span>
                                    <span className='text-indigo-700'>Bairro:&nbsp;
                                        <span className='text-black'>{shippingAddress.neighborhood}</span>
                                    </span>
                                    <span className='text-indigo-700'>Cidade:&nbsp;
                                        <span className='text-black'>{shippingAddress.city}</span>
                                    </span>
                                    <span className='text-indigo-700'>CEP:&nbsp;
                                        <span className='text-black'>{shippingAddress.postalCode}</span>
                                    </span>
                                    <span className='text-indigo-700'>Número:&nbsp;
                                        <span className='text-black'>{shippingAddress.number}</span>
                                    </span>
                                    <span className='text-indigo-700'>Estado:&nbsp;
                                        <span className='text-black'>{shippingAddress.state}</span>
                                    </span>
                                </div>
                                <div className='flex items-center flex-col'>
                                    <Link href="/shipping">
                                        <div className='cursor-pointer bg-sky-100 w-fit hover:bg-indigo-700 hover:text-white text-indigo-700 text-center rounded shadow-md py-2 px-2'>
                                            Editar
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="card bg-white w-1/2 p-5">
                                <div className='flex flex-col justify-between h-full'>
                                    <h2 className="mb-2 text-indigo-600 text-center text-3xl">Método de pagamento</h2>
                                    <div className='mb-2 text-xl text-center'>{paymentMethod}</div>
                                    <div className='flex items-center flex-col'>
                                        <Link href="/payment">
                                            <div className='cursor-pointer bg-sky-100 w-fit hover:bg-indigo-700 hover:text-white text-indigo-700 text-center rounded shadow-md py-2 px-2'>
                                                Editar
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-blue-100 shadow-md rounded-lg p-5 border border-green-700">
                            <h2 className="mb-2 text-indigo-600 text-center text-3xl">Resumo do Pedido</h2>
                            <ul>
                                <li>
                                    <div className="mb-2 gap-5 text-xl flex justify-between">
                                        <div>Itens</div>
                                        <div>R$&nbsp;{itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex text-xl justify-between">
                                        <div>Taxa</div>
                                        <div>R$&nbsp;{taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex text-xl justify-between">
                                        <div>Entrega</div>
                                        <div>R$&nbsp;{shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex text-xl justify-between">
                                        <div>Total</div>
                                        <div className='flex flex-col align-middle items-end'>
                                            <span className='text-md text-red-500 line-through'>de: R$&nbsp;
                                                {totalPrice}</span>
                                            <span className='text-xl text-green-600'>por: R$&nbsp;
                                                {descount}</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button
                                        disabled={loading}
                                        onClick={placeOrderHandler}
                                        className="text-blue-800 text-2xl bg-white shadow-md w-full"
                                    >
                                        {loading ? 'Carregando...' : 'Realizar Pedido'}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

PlaceOrderScreen.auth = true;