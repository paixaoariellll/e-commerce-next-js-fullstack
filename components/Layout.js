import Head from 'next/head'
import React from 'react'

export default function Layout({ children, title }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' e-commerce' : ' e-commerce'} </title>
                <meta name="description" content="E-commerce shop created by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <header>
                    <nav class="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 shadow-lg">
                        <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                            <div class="container-fluid">
                                <a class="text-xl text-black" href="#">E-commerce do Ariel</a>
                            </div>
                            <div className='flex'>
                                <a className='px-3 hover:text-blue-500 cursor-pointer text-black'>Home</a>
                                <a className='px-3 hover:text-blue-500 cursor-pointer text-black'>Shop</a>
                                <a className='px-3 hover:text-blue-500 cursor-pointer text-black'>Feature</a>
                                <a className='px-3 hover:text-blue-500 cursor-pointer text-black'>About</a>
                                <a className='px-3 hover:text-blue-500 cursor-pointer text-black'>Contact</a>
                            </div>
                            <div>
                                <p>login</p>
                            </div>
                        </div>
                    </nav>
                </header>
                <main>
                    <h1 className='container m-auto mt-4 px-4 text-center py-5 text-3xl'>Requisições do banco de dados</h1>
                    <div className='container m-auto mt-4 px-4'>
                        {children}
                    </div>
                </main>
                <footer>
                    footer
                </footer>
            </div>
        </>
    )
}
