import axios from "axios";
import { Bar } from "react-chartjs-2";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useReducer } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function DashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Vendas",
        backgroundColor: "rgb(29 78 216)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout title="Visão Geral">
      <div className="grid md:grid-cols-6 md:gap-5">
        <div className="card md:col-span-1 text-2xl py-5 px-10">
          <ul className="text-center">
            <li className="text-center">
              <i className="ri-admin-fill text-4xl text-blue-700"></i>
            </li>
            <li className="card !bg-blue-700 p-2">
              <Link href="/admin/dashboard">
                <span className="cursor-pointer text-center text-white hover:underline">
                  Visão geral
                </span>
              </Link>
            </li>
            <li className="card p-2 hover:bg-blue-100 ">
              <Link href="/admin/orders">
                <span className="cursor-pointer text-center text-blue-700 hover:underline">
                  Pedidos
                </span>
              </Link>
            </li>
            <li className="card p-2 hover:bg-blue-200 hover:text-white">
              <Link href="/admin/products">
                <span className="cursor-pointer text-center text-blue-700 hover:underline">
                  Produtos
                </span>
              </Link>
            </li>
            <li className="card p-2 hover:bg-blue-200 hover:text-white">
              <Link href="/admin/users">
                <span className="cursor-pointer text-center text-blue-700 hover:underline">
                  Usuários
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-5">
          <h1 className="mb-4 text-center card text-blue-700 text-4xl">
            Visão geral
          </h1>
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5">
                  <p className="text-3xl text-blue-700">
                    R$ {summary.ordersPrice}{" "}
                  </p>
                  <p className="text-xl">Vendas</p>
                  <Link href="/admin/orders">
                    <span className="hover:underline text-blue-700 cursor-pointer">
                      Visualizar vendas
                    </span>
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl text-blue-700">
                    {summary.ordersCount}{" "}
                  </p>
                  <p className="text-xl">Pedidos</p>
                  <Link href="/admin/orders">
                    <span className="hover:underline text-blue-700 cursor-pointer">
                      Visualizar compras
                    </span>
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl text-blue-700">
                    {summary.productsCount}{" "}
                  </p>
                  <p className="text-xl">Produtos</p>
                  <Link href="/admin/products">
                    <span className="hover:underline text-blue-700 cursor-pointer">
                      Visualizar produtos
                    </span>
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl text-blue-700">
                    {summary.usersCount}{" "}
                  </p>
                  <p className="text-xl">Usuários</p>
                  <Link href="/admin/users">
                    <span className="hover:underline text-blue-700 cursor-pointer">
                      Visualizar usuários
                    </span>
                  </Link>
                </div>
              </div>
              <h2 className="text-2xl text-blue-700 p-2">
                Relatório de vendas
              </h2>
              <Bar
                className="card p-10"
                options={{
                  legend: { display: true, position: "right" },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

DashboardScreen.auth = { adminOnly: true };
export default DashboardScreen;
