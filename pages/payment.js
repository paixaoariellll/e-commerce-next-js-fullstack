import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Por favor, selecione o método de pagamento!");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Pagamento">
      <CheckoutWizard activeStep={2} />
      <div className="card w-full">
        <form className="mx-auto max-w-screen-md " onSubmit={submitHandler}>
          <h1 className="my-4 text-center text-blue-800 text-5xl">
            Método de Pagamento
          </h1>
          <div className="flex items-center flex-col">
            {["PayPal", "Stripe", "Boleto", "Pix"].map(
              (payment) => (
                <div
                  key={payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                  className="mb-4 cursor-pointer text-xl p-2 w-1/3 card bg-white hover:text-white hover:bg-blue-800"
                >
                  <input
                    name="paymentMethod"
                    className="p-2 cursor-pointer outline-non focus:ring-0"
                    id={payment}
                    type="radio"
                    checked={selectedPaymentMethod === payment}

                  />
                  <label className="p-2 cursor-pointer" htmlFor={payment}>
                    {payment}
                  </label>
                </div>
              )
            )}
          </div>
          <div className="mb-4 text-xl flex justify-between">
            <button
              onClick={() => router.push("/shipping")}
              type="button"
              className="primary-button"
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
