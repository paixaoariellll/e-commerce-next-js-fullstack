import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'

export default function TestScreen() {
    const { handleSubmit, register } = useForm()
    const checkCPF = (/* e */) => {
        const cpf = "03166164197"
        fetch(`https://apigateway.conectagov.estaleiro.serpro.gov.br/api-cpf-light-trial/v2/consulta/${cpf}`).then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <Layout>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className='mt-4 pb-5  border border-slate-400  shadow-sm shadow-slate-600  p-2'>
                    <div className='text-center text-3xl mb-2'>CPF</div>
                    <div className="mb-4 flex justify-center">
                        <input
                            id='campo'
                            placeholder='CNPJ'
                            className="form-control z-0 block w-2/3 px-4 text-center py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                            {...register("checkCNPJ")}
                        />
                        <span
                            className=" relative right-10 top-2 cursor-pointer !px-0 z-10"
                            id="campo"
                            onClick={checkCPF}
                        >aqui</span>
                    </div>
                    <div className='flex gap-5'>
                        <div className="text-md  p-2 text-center shadow  shadow-slate-600 py-2">
                            <label className='text-md text-indigo-700' htmlFor="valor">Status</label>
                            <input
                                {...register("cpf")}
                                readOnly
                                placeholder='Não Encontrado'
                                className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white  "
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
