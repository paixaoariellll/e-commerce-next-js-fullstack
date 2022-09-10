import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";



export default function Home({ title }) {
  return (
    <div>
      <Head>
        <title>{title ? title + ' e-commerce' : ' e-commerce'} </title>
        <meta name="description" content="E-commerce shop created by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </div>
  )
}
