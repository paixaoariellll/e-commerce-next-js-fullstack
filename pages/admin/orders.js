import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'
import 'remixicon/fonts/remixicon.css'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            state
    }
}

export default function AdminOrderScreen() {
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/admin/orders`)
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }
        fetchData()
    }, [])

    return (
        <Layout title="Pedidos ">
            <div className="grid md:grid-cols-4 md:gap-5">
                <div className='card text-2xl p-5'>
                    <ul>
                        <li>
                            <Link href="/admin/dashboard">
                                <span className="cursor-pointer text-center text-blue-700 hover:underline">Visão Geral</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/orders">
                                <span className="cursor-pointer text-center text-blue-700 hover:underline">Pedidos</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/products">
                                <span className="cursor-pointer text-center text-blue-700 hover:underline">Produtos</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users">
                                <span className="cursor-pointer text-center text-blue-700 hover:underline">Usuários</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="overflow-x-auto md:col-span-3">
                    <h1 className="mb-4 text-center card text-blue-700 text-4xl">Pedidos</h1>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="alert-error">{error}</div>
                    ) : (
                        <div className="overflow-x-auto card container">
                            <table className="min-w-full text-center bg-white rounded-xl p-5 shadow-xl">
                                <thead className="border-b-8 border-b-blue-800">
                                    <tr className='text-2xl text-blue-800'>
                                        <th className="px-5 text-center">ID</th>
                                        <th className="p-5 text-center">Nome do usuário</th>
                                        <th className="p-5 text-center">Data do pedido</th>
                                        <th className="p-5 text-center">Total</th>
                                        <th className="p-5 text-center">Pagamento</th>
                                        <th className="p-5 text-center">Data da entrega</th>
                                        <th className="p-5 text-center">Detalhes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-t-2 text-xl border-t-blue-800">
                                            <td className="p-5">{order._id.substring(20, 24)}</td>
                                            <td className="p-5">
                                                {order.user ? order.user.name : 'DELETED USER'}
                                            </td>
                                            <td className="p-5">
                                                {order.createdAt.substring(0, 10)}
                                            </td>
                                            <td className="p-5">R$ {order.totalPrice}</td>
                                            <td className="p-5">
                                                {
                                                    order.isPaid
                                                        ? <span className='bg-green-200 p-2 rounded-xl'>{order.paidAt.substring(0, 10)}</span>
                                                        : <span className='bg-red-200 p-2 rounded-xl'>Não Pago</span>
                                                }
                                            </td>
                                            <td className="p-5">
                                                {
                                                    order.isDelivered
                                                        ? <span className='bg-green-200 p-2 rounded-xl'>{order.deliveredAt.substring(0, 10)}</span>
                                                        : <div className='flex flex-col items-center'>
                                                            <span className='text-sm'>Previsão: {moment().add(7, 'day').calendar().substring(0, 5)}</span>
                                                            <span className='bg-red-200 p-2 rounded-xl'>Não Entregue</span>
                                                        </div>
                                                }
                                            </td>
                                            <td className="p-5">
                                                <Link href={`/order/${order._id}`} passHref>
                                                    <span>
                                                        <i className='ri-file-history-line'></i>
                                                    </span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

AdminOrderScreen.auth = { adminOnly: true }