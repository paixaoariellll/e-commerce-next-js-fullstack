import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            state;
    }
}
export default function ProdcutsScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: '',
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/admin/products`)
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }

        fetchData()
    }, [])
    return (
        <Layout title="Admin Products">
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
                    <h1 className="mb-4 text-center card text-blue-700 text-4xl">Produtos</h1>
                    {loading ? (
                        <div>Carregando...</div>
                    ) : error ? (
                        <div className="alert-error">{error}</div>
                    ) : (
                        <div className="overflow-x-auto card text-xl">
                            <table className="min-w-full text-center bg-white rounded-xl p-5 shadow-xl">
                                <thead className="border-b-8 border-b-blue-800">
                                    <tr className='text-2xl text-blue-800'>
                                        <th className="px-5 text-center">ID</th>
                                        <th className="p-5 text-center">Nome</th>
                                        <th className="p-5 text-center">Preço</th>
                                        <th className="p-5 text-center">Categoria</th>
                                        <th className="p-5 text-center">Quantidade</th>
                                        <th className="p-5 text-center">Avaliação</th>
                                        <th className="p-5 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id} className="border-t text-center  border-t-blue-800">
                                            <td className=" p-5 ">{product._id.substring(20, 24)}</td>
                                            <td className=" p-5 ">{product.name}</td>
                                            <td className=" p-5 ">R$ {product.price}</td>
                                            <td className=" p-5 ">{product.category}</td>
                                            <td className=" p-5 ">{product.countInStock}</td>
                                            <td className=" p-5 ">{product.rating}</td>
                                            <td className=" p-5 ">
                                                <Link href={`/admin/product/${product._id}`}><button>Editar</button></Link>
                                                &nbsp;
                                                <button>Deletar</button>
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

ProdcutsScreen.auth = { adminOnly: true }
