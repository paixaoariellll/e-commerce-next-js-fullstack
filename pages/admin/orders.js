import axios from "axios";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import "remixicon/fonts/remixicon.css";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Pedidos">
      <div className="grid md:grid-cols-6 md:gap-5">
        <div className="card md:col-span-1 text-2xl py-5 px-10">
          <ul className="text-center">
            <li className="text-center"><i class="ri-admin-fill text-4xl text-blue-700"></i></li>
            <li className="card p-2 hover:bg-blue-100">
              <Link href="/admin/dashBoard">
                <span className="cursor-pointer text-center text-blue-700 hover:underline">
                  Visão geral
                </span>
              </Link>
            </li>
            <li className="card !bg-blue-700 p-2">
              <Link href="/admin/orders">
                <span className="cursor-pointer text-center text-white hover:underline">
                  Pedidos
                </span>
              </Link>
            </li>
            <li className="card p-2 hover:bg-blue-100">
              <Link href="/admin/products">
                <span className="cursor-pointer text-center text-blue-700 hover:underline">
                  Produtos
                </span>
              </Link>
            </li>
            <li className="card p-2 hover:bg-blue-100">
              <Link href="/admin/users">
                <span className="cursor-pointer text-center text-blue-700 hover:underline">
                  Usuários
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-5">
          <h1 className="mb-4 text-center card text-blue-700 text-4xl">
            Pedidos
          </h1>
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto card">
              <table className="min-w-full text-center bg-white rounded-xl p-5 shadow-xl">
                <thead className="border-b-8 border-b-black">
                  <tr className="text-2xl text-blue-800">
                    <th className="px-5 text-center">ID</th>
                    <th className="p-5 text-center">Nome do usuário</th>
                    <th className="p-5 text-center">Data da compra</th>
                    <th className="p-5 text-center">Total</th>
                    <th className="p-5 text-center">Status do pagamento</th>
                    <th className="p-5 text-center">Data da entrega</th>
                    <th className="p-5 text-center">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t border-x text-center border-x-black border-t-black text-xl hover:bg-gray-100"
                    >
                      <td className="p-5">{order._id.substring(20, 24)}</td>
                      <td className="p-5">
                        {order.user ? order.user.name :
                          <span className="text-red-200">Usuário deletado</span>
                        }
                      </td>
                      <td className="p-5">
                        {order.createdAt.substring(8, 10)}/
                        {order.createdAt.substring(5, 7)}/
                        {order.createdAt.substring(0, 4)}
                      </td>
                      <td className="p-5">R$ {order.totalPrice}</td>
                      <td className="p-5">
                        {order.isPaid ? (
                          <span className="bg-green-200 p-2 rounded-xl">
                            {order.paidAt.substring(11, 19)}
                          </span>
                        ) : (
                          <span className="bg-red-200 text-md p-2 rounded-xl">
                            Não Pago
                          </span>
                        )}
                      </td>
                      <td className="p-5">
                        {order.isDelivered ? (
                          <span className="bg-green-200 p-2 rounded-xl">
                            {order.deliveredAt.substring(8, 10)}/
                            {order.deliveredAt.substring(5, 7)}/
                            {order.deliveredAt.substring(0, 4)}
                          </span>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-sm">
                              Previsão:{" "}
                              {order.createdAt.substring(8, 10)}/
                              {order.createdAt.substring(5, 7)}/
                              {order.createdAt.substring(0, 4)}
                            </span>
                            <span className="bg-red-200 text-md p-2 rounded-xl">
                              Não Entregue
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-5">
                        <Link href={`/order/${order._id}`} passHref>
                          <span className="cursor-pointer">
                            <i className="ri-file-list-3-line"></i>
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
  );
}

AdminOrderScreen.auth = { adminOnly: true };
