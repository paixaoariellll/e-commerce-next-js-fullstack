import Image from 'next/image'
import React from 'react'
import Layout from '../components/Layout'
import image from '../public/img/image.svg'

export default function teste() {
    return (
        <Layout>
            <Image
                src={image}
                width={100}
                heigth={100}
                unoptmized ></Image>
        </Layout>
    )
}
