import React from 'react'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' e-commerce' : ' e-commerce'}</title>
                <meta name="description" content="E-commerce shop created by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <header>
                    header
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    footer
                </footer>
            </div>
        </>
    )
}
