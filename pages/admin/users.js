import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, users: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'DELETE_REQUEST':
            return { ...state, loadingDelete: true };
        case 'DELETE_SUCCESS':
            return { ...state, loadingDelete: false, successDelete: true };
        case 'DELETE_FAIL':
            return { ...state, loadingDelete: false };
        case 'DELETE_RESET':
            return { ...state, loadingDelete: false, successDelete: false };
        default:
            return state;
    }
}

function AdminUsersScreen() {
    const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
        useReducer(reducer, {
            loading: true,
            users: [],
            error: '',
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/admin/users`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        } else {
            fetchData();
        }
    }, [successDelete]);

    const deleteHandler = async (userId) => {
        if (!window.confirm('Are you sure?')) {
            return;
        }
        try {
            dispatch({ type: 'DELETE_REQUEST' });
            await axios.delete(`/api/admin/users/${userId}`);
            dispatch({ type: 'DELETE_SUCCESS' });
            toast.success('User deleted successfully');
        } catch (err) {
            dispatch({ type: 'DELETE_FAIL' });
            toast.error(getError(err));
        }
    };

    return (
        <Layout title="Users">
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
                    <h1 className="mb-4 grid-cols-1 text-center card text-blue-700 text-3xl ">Usuários Cadastrados</h1>
                    {loadingDelete && <div>Deleting...</div>}
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="alert-error">{error}</div>
                    ) : (
                        <div className="overflow-x-auto card ">
                            <table className="min-w-full text-center bg-white rounded-xl p-5 shadow-xl">
                                <thead className="border-b-8 border-b-blue-800">
                                    <tr className='text-2xl text-center text-blue-800'>
                                        <th className=" px-5">ID</th>
                                        <th className=" p-5">Nome</th>
                                        <th className=" p-5">Sobrenome</th>
                                        <th className=" p-5">E-mailL</th>
                                        <th className=" p-5">Status</th>
                                        <th className=" p-5">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className="border-t text-xl text-center border-t-blue-800">
                                            <td className=" p-5 ">{user._id.substring(20, 24)}</td>
                                            <td className=" p-5 ">{user.name}</td>
                                            <td className=" p-5 ">{user.lastName}</td>
                                            <td className=" p-5 ">{user.email}</td>
                                            <td className=" p-5 ">{user.isAdmin ? 'Adm' : 'Comum'}</td>
                                            <td className=" p-5 ">
                                                <Link href={`/admin/user/${user._id}`} passHref>
                                                    <button className=" bg-green-200 border border-solid border-gray-300">
                                                        Editar
                                                    </button>
                                                </Link>
                                                &nbsp;
                                                <button
                                                    type="button"
                                                    className='bg-red-200 border border-solid border-gray-300'
                                                    onClick={() => deleteHandler(user._id)}
                                                >
                                                    Deletar
                                                </button>
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

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;