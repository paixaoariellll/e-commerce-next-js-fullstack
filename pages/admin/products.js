import axios from "axios";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}

export default function ProdcutsScreen() {
  const router = useRouter();
  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);
  const deleteHandler = async (productId) => {
    if (!window.confirm("Você tem certeza?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Produto deletado com sucesso!");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };
  const createHandler = async () => {
    if (!window.confirm("Você tem certeza?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Produto criado com sucesso!");
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Produtos">
      <div className="grid md:grid-cols-6 md:gap-5">
        <div className="card md:col-span-1 text-2xl py-5 px-10">
          <ul className="text-center">
            <li className="text-center">
              <i class="ri-admin-fill text-4xl text-blue-700"></i>
            </li>
            <li className="card p-2 hover:bg-blue-100">
              <Link href="/admin/dashBoard">
                <span className="cursor-pointer text-center text-blue-700 hover:underline">
                  Visão geral
                </span>
              </Link>
            </li>
            <li className="card p-2 hover:bg-blue-100">
              <Link href="/admin/orders">
                <span className="cursor-pointer text-center text-blue-700 hover:underline">
                  Pedidos
                </span>
              </Link>
            </li>
            <li className="card !bg-blue-700 p-2">
              <Link href="/admin/products">
                <span className="cursor-pointer text-center text-white hover:underline">
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
          <div className="grid">
            <h1 className="mb-4 text-center card text-blue-700 text-4xl">
              Produtos cadastrados
            </h1>
            {loadingDelete && <div>Deletando item...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="mb-4  grid-cols-1 text-center card py-2 text-blue-700 text-2xl"
            >
              {loadingCreate ? "Carregando" :
                <span className="text-3xl">Adicionar produto</span>}
            </button>
          </div>
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto card text-xl">
              <table className="min-w-full text-center bg-white rounded-xl p-5 shadow-xl">
                <thead className="border-b-8 border-b-black">
                  <tr className="text-2xl text-blue-800">
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
                    <tr
                      key={product._id}
                      className="border-t border-x text-center border-x-black border-t-black text-xl hover:bg-gray-100"
                    >
                      <td className=" p-5 ">{product._id.substring(20, 24)}</td>
                      <td className=" p-5 ">{product.name}</td>
                      <td className=" p-5 ">R$ {product.price}</td>
                      <td className=" p-5 ">{product.category}</td>
                      <td className=" p-5 ">{product.countInStock}</td>
                      <td className=" p-5 ">{product.rating}</td>
                      <td className=" p-5 ">
                        <div className="text-white text-center flex">
                          <Link href={`/admin/product/${product._id}`}>
                            <button className="bg-blue-800 border border-solid border-gray-300 w-15">
                              Editar
                            </button>
                          </Link>
                          {" "}
                          <button
                            onClick={() => deleteHandler(product._id)}
                            type="button"
                            className="bg-blue-800 hover:bg-red-600 border border-solid border-gray-300 w-25"
                          >
                            Deletar
                          </button>
                        </div>
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

ProdcutsScreen.auth = { adminOnly: true };
