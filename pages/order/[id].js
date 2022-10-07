import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true }
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true }
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, errorPay: action.payload }
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false, errorPay: '' }
        default:
            state
    }
}
function OrderScreen() {
    // order/:id
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    const { query } = useRouter()
    const orderId = query.id
    const [{ loading, error, order, successPay, loadingPay }, dispatch] =
        useReducer(reducer, {
            loading: true,
            order: {},
            error: '',
        })
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        }
        if (!order._id || successPay || (order._id && order._id !== orderId)) {
            fetchOrder()
            if (successPay) {
                dispatch({ type: 'PAY_RESET' })
            }
        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/keys/paypal')
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': clientId,
                        currency: 'USD',
                    },
                })
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }
            loadPaypalScript()
        }
    }, [order, orderId, paypalDispatch, successPay])
    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: descount },
                    },
                ],
            })
            .then((orderID) => {
                return orderID
            })
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST' })
                const { data } = await axios.put(
                    `/api/orders/${order._id}/pay`,
                    details
                )
                dispatch({ type: 'PAY_SUCCESS', payload: data })
                toast.success('Pagamento do pedido foi realizado com sucesso!')
            } catch (err) {
                dispatch({ type: 'PAY_FAIL', payload: getError(err) })
                toast.error(getError(err))
            }
        })
    }
    function onError(err) {
        toast.error(getError(err))
    }
    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        descount,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
    } = order
    return (
        <Layout title={`Pedido ${orderId}`}>
            <h1 className="mb-4 text-center text-blue-800 text-4xl bg-white rounded-xl">{`Id: ${orderId}`}</h1>
            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div className="alert-error">{error}</div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <div className="card bg-white text-center overflow-x-auto p-5">
                            <h2 className="mb-2 text-blue-600 text-3xl">Lista dos Produtos</h2>
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr className='text-blue-700 text-2xl'>
                                        <th className="px-5 text-center">Item</th>
                                        <th className="p-5 text-center">Quantidade</th>
                                        <th className="p-5 text-center">Preço</th>
                                        <th className="p-5 text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item) => (
                                        <tr key={item._id} className='border-y divide-blue-600 border-blue-600'>
                                            <td>
                                                <Link href={`/product/${item.slug}`}>
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
                                            <td className="p-5 text-center">R$ {item.price}</td>
                                            <td className="p-5 text-center">
                                                R$ {item.quantity * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-between gap-x-5'>
                            <div className="card bg-white w-1/2 p-5">
                                <h2 className="mb-2 text-blue-600 text-center text-3xl">Endereço para entrega</h2>
                                <div className='flex items-left flex-col justify-between gap-2 mb-2'>
                                    <span className='text-blue-700'>Nome:&nbsp;
                                        <span className='text-black'>{shippingAddress.name}</span>
                                    </span>
                                    <span className='text-blue-700'>Endereço:&nbsp;
                                        <span className='text-black'>{shippingAddress.address}</span>
                                    </span>
                                    <span className='text-blue-700'>Bairro:&nbsp;
                                        <span className='text-black'>{shippingAddress.neighborhood}</span>
                                    </span>
                                    <span className='text-blue-700'>Cidade:&nbsp;
                                        <span className='text-black'>{shippingAddress.city}</span>
                                    </span>
                                    <span className='text-blue-700'>CEP:&nbsp;
                                        <span className='text-black'>{shippingAddress.postalCode}</span>
                                    </span>
                                    <span className='text-blue-700'>Número:&nbsp;
                                        <span className='text-black'>{shippingAddress.number}</span>
                                    </span>
                                    <span className='text-blue-700'>Estado:&nbsp;
                                        <span className='text-black'>{shippingAddress.state}</span>
                                    </span>
                                </div>
                                <div className='flex items-center flex-col'>
                                    {isDelivered ? (
                                        <div className="alert-success">Entregue {deliveredAt}</div>
                                    ) : (
                                        <div className="alert-error">Não entregue</div>
                                    )}
                                </div>
                            </div>
                            <div className="card bg-white w-1/2 p-5">
                                <div className='flex flex-col justify-between h-full'>
                                    <h2 className="mb-2 text-blue-600 text-center text-3xl">Método de pagamento</h2>
                                    <div className='mb-2 text-xl text-center'>{paymentMethod}</div>
                                    <div className='flex items-center flex-col'>
                                        {isPaid ? (
                                            <div className="alert-success">Pago às {paidAt.substring(11, 19)} do dia {paidAt.substring(0, 10)} </div>
                                        ) : (
                                            <div className="alert-error">Ainda não confirmado</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-blue-100 shadow-md rounded-lg p-5 border border-green-700">
                            <h2 className="mb-2 text-blue-600 text-center text-3xl">Resumo do Pedido</h2>
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
                                {!isPaid && (
                                    <li>
                                        {isPending ? (
                                            <div>Carregando...</div>
                                        ) : (
                                            <div className="w-full">
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        )}
                                        {loadingPay && <div>Carregando...</div>}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

OrderScreen.auth = true;
export default OrderScreen;