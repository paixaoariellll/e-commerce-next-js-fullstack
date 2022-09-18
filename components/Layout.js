import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'

const nav_links = [
    {
        path: "/",
        display: "Home",
    },
    {
        path: "categoria",
        display: "Categorias",
    },
    {
        path: "sobre",
        display: "Sobre",
    },
    {
        path: "contato",
        display: "Contatos",
    },
]

export default function Layout({ title, children }) {
    const { state } = useContext(Store)
    const { cart } = state
    const year = new Date().getFullYear();
    const [cartItemsCount, setCartItemsCount] = useState(0)
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])

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
                                <a class="text-xl text-black" href="/">E-commerce do Ariel</a>
                            </div>
                            <div className='menu flex gap-5'>
                                {
                                    nav_links.map((item, index) => (
                                        <ul>
                                            <li key={index}>
                                                <a href={item.path}>
                                                    {item.display}
                                                </a>
                                            </li>
                                        </ul>
                                    ))
                                }
                            </div>
                            <div>
                                <Link href="/cart">
                                    <a className='p-2 text-2xl'>
                                        {cartItemsCount > 0 && ({ cartItemsCount })}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </header>
                <main>
                    <div className='container m-auto mt-4 px-10'>
                        {children}
                    </div>
                </main>
                <footer className="flex text-xl h-10 justify-center items-center shadow-inner">
                    <p>Copyright © {year}, Ariel Paixão</p>
                </footer>
            </div>
        </>
    )
}
