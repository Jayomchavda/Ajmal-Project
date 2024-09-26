import React from 'react'
import data from "../Components/data.json"
import data2 from "../Components/datatwo.json"
import data3 from "../Components/datathree.json"
import Bestseller from '../Components/Bestseller';
import PopularCat from '../Components/PopularCat';
import Heroimgslider from '../Components/Heroimgslider';
import Instatitle from '../Components/Instatitle';
import Footer from '../Components/Footer';
import Arrivals from '../Components/Arrivals';
import Slider from '../Components/Slider';

export default function Home() {


    return (
        <div>
            <Heroimgslider />
            <Arrivals />
            <Slider data={data} />
            <Bestseller />
            <Slider data={data2} />
            <PopularCat />
            <Slider data={data3} />
            <Instatitle />
            <Footer />
        </div>

        // <div className="container mx-auto px-4">
        //     <Heroimgslider />
        //     <Arrivals className="my-8" />
        //     <Slider data={data} className="my-8" />
        //     <Bestseller className="my-8" />
        //     <Slider data={data2} className="my-8" />
        //     <PopularCat className="my-8" />
        //     <Slider data={data3} className="my-8" />
        //     <Instatitle className="my-8" />
        //     <Footer className="my-8" />
        // </div>

    )
}
