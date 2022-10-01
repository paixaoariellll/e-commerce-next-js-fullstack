import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {

    const router = useRouter();
    const { message } = router.query;

    return (
        <Layout title="Acesso Negado">
            <div className='card w-full p-5 bg-white'>
                <h1 className="text-center text-red-500 text-3xl">Accesso Negado!</h1>
                {
                    message &&
                    <div className="mb-4 text-xl text-center text-red-500">
                        Você não pode acessar essa página antes de fazer login!
                    </div>
                }
                <div className='text-center'>
                    <button
                        onClick={() => router.push('/login')}
                        type="button"
                        className="default-button bg-red-400"
                    >
                        Fazer login
                    </button>
                </div>
            </div>
        </Layout>
    );
}