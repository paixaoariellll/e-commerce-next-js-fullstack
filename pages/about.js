import Image from 'next/image'
import React from 'react'
import Layout from '../components/Layout'
import TeamSvg from '../public/img/Team.svg'

export default function AboutScreen() {
    return (
        <Layout>
            <section className="grid mb-14 grid-cols-1 md:grid-cols-1 bg_img lg:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="col-span-1 text-center">
                    <Image
                        src={TeamSvg}
                        className="w-full card !shadow-none vertical_img !bg-sky-100"
                        alt="Sample image"
                        layout="responsive"
                        width={350}
                        height={350}
                    />
                </div>
                <div className="col-span-1 flex flex-col justify-between">
                    <div className="my-10">
                        <div className='mb-5'>
                            <span className='text-3xl p-5'>Nós somos</span>
                        </div>
                        <h1 className="text-4xl lg:ml-10 lg:text-left md:text-center sm:text-center text-center  text-slate-600">
                            Alunos da Faculdade de Tecnologia de Guaratinguetá
                            <span className="text-blue-800 text-5xl"> Análise e Desenvolvimento de Sistemas</span>
                        </h1>
                        <div className="text-3xl p-5">
                            Conheça um pouco mais sobre nosso projeto GameOn.
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}