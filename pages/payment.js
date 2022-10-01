import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function PaymentScreen() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;
    const router = useRouter();
    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            return toast.error('Por favor, selecione o método de pagamento!');
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod,
            })
        );
        router.push('/placeorder');
    };
    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push('/shipping');
        }
        setSelectedPaymentMethod(paymentMethod || '');
    }, [paymentMethod, router, shippingAddress.address]);

    return (
        <Layout title="Pagamento">
            <CheckoutWizard activeStep={2} />
            <div className='card w-full'>
                <form className="mx-auto max-w-screen-md " onSubmit={submitHandler}>
                    <h1 className="mb-4 text-center text-blue-900 text-2xl">Método de Pagamento</h1>
                    <div className='flex items-center flex-col'>
                        {
                            ['PayPal', 'Stripe', 'Boleto', 'Pix', 'Dinheiro na Entrega'].map((payment) => (
                                <div key={payment} className="mb-4 cursor-pointer text-xl p-2 w-1/3 card bg-white hover:text-white hover:bg-blue-900">
                                    <input
                                        name="paymentMethod"
                                        className="p-2 cursor-pointer outline-non focus:ring-0"
                                        id={payment}
                                        type="radio"
                                        checked={selectedPaymentMethod === payment}
                                        onChange={() => setSelectedPaymentMethod(payment)}
                                    />
                                    <label className="p-2 cursor-pointer" htmlFor={payment}>
                                        {payment}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mb-4 flex justify-between">
                        <button
                            onClick={() => router.push('/shipping')}
                            type="button"
                            className="default-button bg-red-400"
                        >
                            Voltar
                        </button>
                        <button className="primary-button">Avançar</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

PaymentScreen.auth = true;