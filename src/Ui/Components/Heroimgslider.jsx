import React from 'react'
import { Carousel } from "flowbite-react";

export default function Heroimgslider() {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel leftControl="<" rightControl=">" >
                <img src="../../../public/Heroimg1.webp" alt="..." />
                <img src="../../../public/Heroimg2.webp" alt="..." />
                <img src="../../../public/Heroimg3.webp" alt="..." />
                <img src="../../../public/Heroimg4.webp" alt="..." />
            </Carousel>
        </div >
    )
}
