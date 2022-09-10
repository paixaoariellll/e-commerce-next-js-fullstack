import React from 'react'


export default function Layout({ children }) {
    return (
        <>
            <title>Home</title>
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
                    Main
                    {children}
                </main>
                <footer>
                    footer
                </footer>
            </div>
        </>
    )
}
