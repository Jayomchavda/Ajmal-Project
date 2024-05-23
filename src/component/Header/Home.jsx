import React from 'react'

import data from "../data.json"
import data2 from "../datatwo.json"
import data3 from "../datathree.json"
import Arrivals from '../../Ui/pages/Arrivals';
import Slider from '../Slider';
import Bestseller from '../../Ui/pages/Bestseller';
import PopularCat from '../../Ui/pages/PopularCat'
import Heroimgslider from '../../Ui/pages/Heroimgslider'
import Instatitle from '../../Ui/pages/Instatitle'
import Footer from '../Footer/Footer';


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
    )
}
