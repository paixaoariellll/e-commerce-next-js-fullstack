import axios from 'axios'
import Link from 'next/link'
import { Bar } from 'react-chartjs-2'
import React, { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
}

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, summary: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            state
    }
}

function AdminDashboardScreen() {
    const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
        loading: true,
        summary: { salesData: [] },
        error: '',
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/admin/summary`)
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }

        fetchData()
    }, [])
    const data = {
        labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
        datasets: [
            {
                label: 'Vendas',
                backgroundColor: 'rgb(29 78 216)',
                data: summary.salesData.map((x) => x.totalSales),
            },
        ],
    }
    return (
        <Layout title="Visão Geral ">
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
                <div className="md:col-span-3">
                    <h1 className="mb-4 text-center card text-blue-700 text-4xl">Visão Geral</h1>
                    {loading ? (
                        <div>Carregando...</div>
                    ) : error ? (
                        <div className="alert-error">{error}</div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="card m-5 p-5">
                                    <p className="text-3xl text-blue-800">R$ {summary.ordersPrice} </p>
                                    <p className='text-xl'>Vendas</p>
                                    <Link href="/admin/orders">
                                        <span className='hover:underline text-blue-700 cursor-pointer'>Visualizar Vendas</span>
                                    </Link>
                                </div>
                                <div className="card m-5 p-5">
                                    <p className="text-3xl text-blue-800">{summary.ordersCount} </p>
                                    <p className='text-xl'>Pedidos</p>
                                    <Link href="/admin/orders">
                                        <span className='hover:underline text-blue-700 cursor-pointer'>Visualizar Pedidos</span>
                                    </Link>
                                </div>
                                <div className="card m-5 p-5">
                                    <p className="text-3xl text-blue-800">{summary.productsCount} </p>
                                    <p className='text-xl'>Produtos</p>
                                    <Link href="/admin/products">
                                        <span className='hover:underline text-blue-700 cursor-pointer'>Visualizar produtos</span>
                                    </Link>
                                </div>
                                <div className="card m-5 p-5">
                                    <p className="text-3xl text-blue-800">{summary.usersCount} </p>
                                    <p className='text-xl'>Usuários</p>
                                    <Link href="/admin/users">
                                        <span className='hover:underline text-blue-700 cursor-pointer'>Visualizar Usuários</span>
                                    </Link>
                                </div>
                            </div>
                            <h2 className="text-2xl text-blue-800 p-2">Relatório de Vendas</h2>
                            <Bar className='card p-10'
                                options={{
                                    legend: { display: true, position: 'right' },
                                }}
                                data={data}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

AdminDashboardScreen.auth = { adminOnly: true }
export default AdminDashboardScreen
