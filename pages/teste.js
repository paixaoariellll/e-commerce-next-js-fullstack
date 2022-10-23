import { Carousel } from '@mantine/carousel';
import React from 'react';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import img1 from '../public/img/God-of-war-ragnarok.jpg'
import img2 from '../public/img/Death-stranding.jpg'
import img3 from '../public/img/Spider-man.jpeg'
import img4 from '../public/img/Gears-5.jpeg'
import img5 from '../public/img/Dark-souls-3.jpeg'
import img6 from '../public/img/Fifa-23.jpg'
import Layout from '../components/Layout';

export default function teste() {
    const autoplay = useRef(Autoplay({ delay: 5000 }));
    return (
        <Layout>
            <div className='card cursor-move p-5'>
                <h1 className='text-4xl text-center text-blue-800 m-5'>Jogos da Semana</h1>
                <Carousel
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                    slideSize="33.3%"
                    align="center"
                    height={400}
                    slideGap="md"
                    controlsOffset="xs"
                    controlSize={50}
                    orientation="horizontal"
                    loop
                    withIndicators
                    styles={{
                        indicator: {
                            width: 100,
                            height: 10,
                            color: 'red',
                            backgroundColor: 'red',
                            transition: 'width 250ms ease-in-out',
                            '&[data-active]': {
                                width: 300,
                                background: 'blue',
                            },
                        },
                    }}
                    withControls={false}

                >
                    <Carousel.Slide>
                        <Image src={img1} alt="imagem" width={500} height={500} unoptimized />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={img2} alt="imagem" width={500} height={500} unoptimized />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={img3} alt="imagem" width={500} height={500} unoptimized />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={img4} alt="imagem" width={500} height={500} unoptimized />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={img5} alt="imagem" width={500} height={500} unoptimized />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={img6} alt="imagem" width={500} height={500} unoptimized />
                    </Carousel.Slide>
                </Carousel>
            </div>
        </Layout >
    )
}
