import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'remixicon/fonts/remixicon.css'
import { signOut, useSession } from 'next-auth/react'
import DropdownLink from './DropdownLink'
import { Menu } from '@headlessui/react'
import Cookies from 'js-cookie'
import Image from 'next/image'
import M from '../public/img/M.svg'

export default function Layout({ title, children }) {
    const { status, data: session } = useSession()
    const year = new Date().getFullYear()
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const { state, dispatch } = useContext(Store)
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
                <title>{title ? title + ' - GameOn' : ' - GameOn'} </title>
                <meta charset="UTF-8" />
                <meta name="Projeto Integrador" content="GameOn shop created by create next app" />
                <meta name="description" content="Encontre jogos eletrônicos com preços acessíveis e muita variedade!" />
                <meta name="keywords" content="Comércio eletrônico, Loja de jogos, Loja de Games, Loja eletrônica, Games, Jogos, mídia física" />
                <meta name="author" content="Ariel Paixão, Carlos Junior e João Machado" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="img/logo-icon.svg" />
            </Head>
            <ToastContainer position='bottom-center' limit={1} />
            <div className=" p-1 text-md text-center text-red-600 bg-red-100" role="alert">
                <span className="text-xl">Aviso!</span> Site em desenvolvimento.
            </div>
            <div className='flex flex-col justify-between'>
                <header>
                    <nav className="relative w-full flex flex-wrap items-center justify-between py-1 bg-white text-gray-500 shadow-lg">
                        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                            <div className="container-fluid">
                                <Link href="/">
                                    <div className='text-blue-800 cursor-pointer text-5xl'>
                                        <span>Ga</span>
                                        <Image src={M} alt="logo de um controle-Remoto" width={50} height={30}></Image>
                                        <span>e</span>
                                        <span className='bg-blue-800 rounded-lg text-white text-5xl'>On</span>
                                    </div>
                                </Link>
                            </div>
                            <div className='menu flex gap-5'>
                            </div>
                            <div className='flex'>
                                <Link href="/cart">
                                    <div className='px-2 py-3 cursor-pointer text-blue-800 bg-white rounded-lg hover:text-white hover:bg-blue-800 text-2xl'>
                                        {cartItemsCount > 0 && (
                                            <span
                                                style={{ color: 'white', background: 'red' }}
                                                className=' ml-1 rounded-full px-2 py-1 text-sm font-bold'>
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
                                                <Menu.Button className="text-blue-800 text-xl border border-solid border-gray-300">
                                                    {session.user.name}
                                                </Menu.Button>
                                                <Menu.Items className="absolute z-20 right-0 m-2 w-56 origin-top-right bg-white shadow-lg ">
                                                    {!session.user.isAdmin && (
                                                        <Menu.Item>
                                                            <DropdownLink className="dropdown-link m-2 rounded-md" href="/profile">
                                                                Perfil
                                                            </DropdownLink>
                                                        </Menu.Item>
                                                    )}
                                                    <Menu.Item>
                                                        <DropdownLink
                                                            className="dropdown-link m-2 rounded-md"
                                                            href="/orderHistory"
                                                        >
                                                            Histórico de pedidos
                                                        </DropdownLink>
                                                    </Menu.Item>
                                                    {session.user.isAdmin && (
                                                        <Menu.Item>
                                                            <DropdownLink
                                                                className="dropdown-link m-2 rounded-md"
                                                                href="/admin/dashboard"
                                                            >
                                                                Dashboard
                                                            </DropdownLink>
                                                        </Menu.Item>
                                                    )}
                                                    <Menu.Item>
                                                        <a
                                                            className="dropdown-link m-2 rounded-md"
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
                                                <div className='p-2 px-2 py-3 cursor-pointer text-blue-800 bg-white rounded-lg hover:text-white hover:bg-blue-800 text-2xl'>
                                                    <div className='cursor-pointer'>
                                                        <i className="ri-login-box-line"></i>
                                                    </div>
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
                <footer className="flex bg-white justify-center items-center h-10 shadow-md">
                    <p>Copyright &copy; {year}, Game<span className='bg-blue-800 rounded-t-sm text-white'>On</span>.</p>
                </footer>
            </div >
        </>
    )
}
