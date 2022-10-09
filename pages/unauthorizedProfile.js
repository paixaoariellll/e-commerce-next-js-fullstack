import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

export default function UnauthorizedProfile() {
    const router = useRouter()
    const { message } = router.query

    return (
        <Layout title="Acesso Negado">
            <div className='card w-full p-5 bg-white'>
                <h1 className="text-center text-red-500 text-5xl">Accesso Negado!</h1>
                {
                    message &&
                    <div className="mb-4 text-2xl text-center text-gray-900">
                        Você não pode acessar essa página!
                    </div>
                }
                <div className='text-center'>
                    <button
                        onClick={() => router.push('/')}
                        type="button"
                        className=" bg-blue-700 text-xl text-white"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </Layout>
    )
}