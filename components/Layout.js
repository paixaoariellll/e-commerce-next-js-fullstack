import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'
import 'remixicon/fonts/remixicon.css'

const nav_links = [
    {
        path: "/",
        display: "Home",
    },
    /*     {
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
        }, */
]

export default function Layout({ title, children }) {
    const { state } = useContext(Store)
    const { cart } = state
    const year = new Date().getFullYear()
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
            <div className='flex flex-col justify-between'>
                <header>
                    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 shadow-lg">
                        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                            <div className="container-fluid">
                                <Link href="/">
                                    <div
                                        className="text-xl text-black">
                                        E-commerce FullStack
                                    </div>
                                </Link>
                            </div>
                            <div className='menu flex gap-5'>
                                {
                                    nav_links.map((item, index) => (
                                        <ul key={index}>
                                            <li>
                                                <Link href={item.path}>
                                                    {item.display}
                                                </Link>
                                            </li>
                                        </ul>
                                    ))
                                }
                            </div>
                            <div className='flex'>
                                <Link href="/cart">
                                    <div className=' p-2 text-black text-2xl'>
                                        {cartItemsCount > 0 && (
                                            <span
                                                style={{ color: 'white', background: 'red' }}
                                                className=' ml-1 rounded-full px-2 py-1 text-xs font-bold'>
                                                {cartItemsCount}
                                            </span>
                                        )}
                                        <i className="ri-shopping-cart-line"></i>
                                    </div>
                                </Link>
                                <Link href="/login">
                                    <div className='p-2 wra text-black text-2xl'>
                                        <i className="ri-login-box-line"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </header>
                <main>
                    <div className='container min-h-screen m-auto mt-8 px-0'>{children}</div>
                </main>
                <footer className="flex justify-center items-center h-10 shadow-inner">
                    <p>Copyright © {year}, Ariel Paixão</p>
                </footer>
            </div>
        </>
    )
}
