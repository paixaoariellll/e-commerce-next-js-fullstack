import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

function CartScreen() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store);
    const { cart: { cartItems }, } = state;
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const updateCartHandler = (item, qty) => {
        const quantity = Number(qty)
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
    }
    return (
        <Layout title="Carrinho">
            <h1 className="mb-5 text-3xl text-center">Carrinho de compras</h1>
            {
                cartItems.length === 0 ? (
                    <div className='text-center mb-5'>
                        <div className='mb-5 text-xl' >
                            O carrinho está vazio.
                        </div>
                        <Link href="/">
                            <buton className="primary-button">Voltar</buton>
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-4 text-xl md:gap-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <table className="min-w-full ">
                                <thead className="border-b">
                                    <tr>
                                        <th className="p-5 text-left">Item</th>
                                        <th className="p-5 text-right">Quantidade</th>
                                        <th className="p-5 text-right">Preço</th>
                                        <th className="p-5">Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.slug} className="border-b">
                                            <td>
                                                <Link href={`/product/${item.slug}`}>
                                                    <a className="flex items-center">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                        ></Image>
                                                        &nbsp;
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className="p-5 text-right">
                                                <select
                                                    className='bg-white text-xl'
                                                    value={item.value}
                                                    onChange={(e) =>
                                                        updateCartHandler(item, e.target.value)
                                                    }
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option
                                                                key={x + 1} value={x + 1}>{x + 1}
                                                            </option>
                                                        ))}
                                                </select>
                                            </td>
                                            <td className="p-5 text-right">${item.price}</td>
                                            <td className="p-5 text-center">
                                                <a style={{ cursor: 'pointer' }} className='bg-none' onClick={() => removeItemHandler(item)}>
                                                    <i class="ri-close-circle-line"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card p-5">
                            <ul>
                                <li>
                                    <div className="pb-3 text-xl">
                                        Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                                        {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                    </div>
                                </li>
                                <li>
                                    <button
                                        onClick={() => router.push('login?redirect=shipping')}
                                        className="primary-button w-full"
                                    >
                                        Confirmar
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </Layout >
    );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })