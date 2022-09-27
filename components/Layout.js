import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'remixicon/fonts/remixicon.css'
import { signOut, useSession } from 'next-auth/react'
import DropdownLink from './DropdownLink'
import { Menu } from '@headlessui/react';
import Cookies from 'js-cookie';

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
    const { status, data: session } = useSession()
    const year = new Date().getFullYear()
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const { state, dispatch } = useContext(Store);
    const { cart } = state
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])
    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' })
        signOut({ callbackUrl: '/login' })
    }
    return (
        <>
            <Head>
                <title>{title ? title + ' e-commerce' : ' e-commerce'} </title>
                <meta name="description" content="E-commerce shop created by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer position='bottom-center' limit={1} />

            <div className='flex flex-col justify-between'>
                <header>
                    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 shadow-lg">
                        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                            <div className="container-fluid">
                                <Link href="/">
                                    <div
                                        className="text-xl cursor-pointer text-black">
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
                                {status === 'loading' ?
                                    ('Carregando') :
                                    session?.user ?
                                        (
                                            <Menu as="div" className="relative inline-block">
                                                <Menu.Button className="text-blue-600">
                                                    {session.user.name}
                                                </Menu.Button>
                                                <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                                                    <Menu.Item>
                                                        <DropdownLink className="dropdown-link" href="/profile">
                                                            Perfil
                                                        </DropdownLink>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <DropdownLink
                                                            className="dropdown-link"
                                                            href="/order-history"
                                                        >
                                                            Histórico de pedidos
                                                        </DropdownLink>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <a
                                                            className="dropdown-link"
                                                            href="#"
                                                            onClick={logoutClickHandler}
                                                        >
                                                            Sair
                                                        </a>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Menu>
                                        ) : (
                                            <Link href='/login'>
                                                <div className='p-2 wra text-black text-2xl'>
                                                    <a className='p-2'>
                                                        <i className="ri-login-box-line"></i>
                                                    </a>
                                                </div>
                                            </Link>
                                        )
                                }
                            </div>
                        </div>
                    </nav >
                </header >
                <main>
                    <div className='container min-h-screen m-auto mt-8 px-0'>{children}</div>
                </main>
                <footer className="flex justify-center items-center h-10 shadow-inner">
                    <p>Copyright © {year}, Ariel Paixão</p>
                </footer>
            </div >
        </>
    )
}
