import Image from "next/image";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Layout from "../components/Layout";
import img1 from "../public/img/Spider-man.jpeg";

const handleDragStart = (e) => e.preventDefault();

/* const items = [
    <Image src={img1} alt="image" width={200} height={200} onDragStart={handleDragStart} role="presentation" />,
    <Image src={img1} alt="image" width={200} height={200} onDragStart={handleDragStart} role="presentation" />,
    <Image src={img1} alt="image" width={200} height={200} onDragStart={handleDragStart} role="presentation" />,
]; */

export default function teste({ items }) {
    return (
        <Layout>
            <div className="card p-5">
                <AliceCarousel mouseTracking items={items} />
            </div>
        </Layout>
    );
}

