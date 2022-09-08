import Head from "next/head";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Ariel</title>
        <meta name="description" content="E-commerce shop created by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl text-center
       hover:bg-white hover:text-red-600" >E-commerce</h1>
    </div>
  )
}
