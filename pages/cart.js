import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios';
import { toast } from 'react-toastify';

function CartScreen() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store);
    const { cart: { cartItems }, } = state;
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    }
    const updateCartHandler = async (item, qty) => {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            return toast.error('Não possuimos mais desse produto em estoque');
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
        toast.success('Produto adicionado ao carrinho!');
    }
    return (
        <Layout title="Carrinho">
            <h1 className="mb-5 text-3xl text-blue-900 text-center">Carrinho de compras</h1>
            {
                cartItems.length === 0 ? (
                    <div className='text-center mb-5'>
                        <div className='mb-5 text-xl' >
                            O carrinho está vazio.
                        </div>
                        <Link href="/">
                            <buton className="primary-button cursor-pointer">Voltar</buton>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="grid md:grid-cols-4 text-xl md:gap-5">
                            <div className="overflow-x-auto md:col-span-3">
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="p-5 text-center">Item</th>
                                            <th className="p-5 text-center">Quantidade</th>
                                            <th className="p-5 text-center">Preço</th>
                                            <th className="p-5 text-center">Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.slug} className="border-b">
                                                <td>
                                                    <Link href={`/product/${item.slug}`}>
                                                        <div className="flex cursor-pointer justify-center text-center">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={80}
                                                                height={80}
                                                            ></Image>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="p-5 text-center">
                                                    <select
                                                        className='bg-white-900 p-1 text-blue-800 text-xl'
                                                        value={item.quantity}
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
                                                <td className="p-5 pointer-events-none text-blue-800 text-center">$&nbsp;{item.price}</td>
                                                <td className="p-5 text-center">
                                                    <button onClick={() => removeItemHandler(item)}
                                                        className="bg-white shadow-lg">
                                                        <div className='bg-none'>
                                                            <i className="ri-delete-bin-line"></i>
                                                        </div>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <ul className="card bg-white p-5">
                                    <li>
                                        <div className="pb-3 text-xl">
                                            Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}) {" "}:
                                            ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
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
                    </div>
                )
            }
        </Layout >
    );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })