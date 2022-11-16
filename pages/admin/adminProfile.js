import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import Layout from '../../components/Layout'
import { MdAdminPanelSettings } from 'react-icons/md'
import { useForm } from 'react-hook-form'

export default function adminProfile() {
    const { data: session } = useSession()
    const { register, handleSubmit, setValue } = useForm()

    const checkCNPJ = (e) => {
        const cnpjEmpresa = '60316817000103';
        const cnpj = e.target.value.replace(/\D/g, '')
        fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjEmpresa}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setValue("razao_social", data.razao_social);
                setValue("nome_fantasia", data.nome_fantasia);
                setValue("cnpj", data.cnpj);
            })
    }

    return (
        <Layout title="Perfil do Administrador">
            <div className=''>
                <div className='grid grid-cols-6 gap-5'>
                    <div className='border-4 col-span-4 rounded-lg p-10 bg-slate-50 shadow-sm shadow-slate-600'>
                        <span className='text-center my-2'>
                            <h2 className='text-5xl'><span className='text-blue-700'>Informações </span> da Empresa</h2>
                        </span>
                        <div>
                            <button
                                className="primary-button w-full bg-white"
                                id="postalCode"
                                onClick={checkCNPJ}
                            >Ver Dados da empresa</button>
                            <form
                                className='w-full bg-white'
                                onSubmit={handleSubmit((data) => console.log(data))}>
                                <div className="mb-4 grid col-span-1">
                                    <label className="text-xl text-blue-800" htmlFor="razao_social">
                                        Nome completo
                                    </label>
                                    <input
                                        {...register("razao_social")}
                                        placeholder="razao_social"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                    />
                                </div>
                                <div className="mb-4 grid col-span-1">
                                    <label className="text-xl text-blue-800" htmlFor="nome_fantasia">
                                        Nome fantasia
                                    </label>
                                    <input
                                        {...register("nome_fantasia")}
                                        placeholder="nome_fantasia"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                    />
                                </div>
                                <div className="mb-4 grid col-span-1">
                                    <label className="text-xl text-blue-800" htmlFor="cnpj">
                                        CNPJ
                                    </label>
                                    <input
                                        {...register("cnpj")}
                                        placeholder="cnpj"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-span-2 bg-slate-900 shadow-sm shadow-slate-600'>
                        <div className='border-4 '>
                            {session?.user.isAdmin ?
                                (
                                    <div className='p-10'>
                                        <div className='flex justify-center '>
                                            <Image
                                                src={`/imgUser/${session.user.name}.jpg`}
                                                width={100}
                                                height={100}
                                                unoptimized
                                                className="shadow-black rounded-full "
                                                alt="Foto de perfil"
                                            />
                                        </div>
                                        <div className=''>
                                            <span className='text-xl text-slate-50 flex justify-center'><MdAdminPanelSettings className='text-3xl' />Administrador</span>
                                        </div>
                                        <div className='mt-4 grid gap-y-4 border p-2'>
                                            <div className="text-md text-white text-center shadow  shadow-slate-50 py-2">
                                                <div className=''>Nome:</div> <span className='text-slate-50 '>{session.user.name}</span>
                                            </div>
                                            <div className="text-md text-white text-center shadow  shadow-slate-50 py-2">
                                                <div className=''>Email:</div> <span className='text-slate-50 '>{session.user.email}</span>
                                            </div>
                                            <div className="text-md text-white text-center shadow  shadow-slate-50 py-2">
                                                <div className=''>ID:</div> <span className='text-slate-50 '>{session.user._id}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : ("")
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}