import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {[
        "Autenticação",
        "Endereço de entrega",
        "Método de pagamento",
        "Revisão da compra",
      ].map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2 text-center text-2xl 
                        ${index <= activeStep
              ? "border-blue-700 text-blue-700"
              : "border-gray-400 text-gray-400"
            }
      `}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
