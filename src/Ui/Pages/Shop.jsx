import React, { useEffect, useState } from "react";
import shopdata from "../../Ui/Components/shopdata.json";
import { Dropdown } from "flowbite-react";
import Cardcom from "../Components/Cardcom";
import Footer from "../Components/Footer";
import { instanceApi } from "../Api/axiosconfig";
import { toast } from "react-toastify";

export default function Shop() {
    let [allData, setAllData] = useState([]);
    let [filter, setFilter] = useState({
        mainCategory: "",
        size: [],
        gender: "",
        price: {
            gt: 0,
            lt: 10000000,
        },
        discountPercentage: {
            gt: 0,
            lt: 100,
        },
    });
    useEffect(() => {
        async function getData(params) {
            try {
                let response = await instanceApi("/product/getAll", {
                    params: filter,
                });
                setAllData(response.data.data);
            } catch (error) {
                toast.error("Somthing went wrong");
            }
        }
        getData();
    }, [filter]);
    return (
        <>
            <h1>{allData.length}</h1>
            <div className="my-4 flex space-x-2 justify-center ">
                <Dropdown
                    label="Short By recommended"
                    dismissOnClick={false}
                    className="bg-white border border-black "
                >
                    <Dropdown.Item>Size</Dropdown.Item>
                    <Dropdown.Item>Best Seller</Dropdown.Item>
                    <Dropdown.Item>Revenue</Dropdown.Item>
                    <Dropdown.Item>Most Viewed</Dropdown.Item>
                    <Dropdown.Item>Reviews Count</Dropdown.Item>
                    <Dropdown.Item>Top Rated</Dropdown.Item>
                    <Dropdown.Item>New </Dropdown.Item>
                    <Dropdown.Item>Biggest Saving </Dropdown.Item>
                    <Dropdown.Item>Price</Dropdown.Item>
                </Dropdown>

                <Dropdown
                    label="Category"
                    //   dismissOnClick={false}

                    className="bg-white border border-black"
                >
                    <Dropdown.Item
                        onClick={(e) => setFilter({ ...filter, mainCategory: "" })}
                    >
                        All
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={(e) => setFilter({ ...filter, mainCategory: "attar" })}
                    >
                        Attar
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={(e) => setFilter({ ...filter, mainCategory: "bodyMist" })}
                    >
                        Body Mist
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={(e) => setFilter({ ...filter, mainCategory: "bodySpray" })}
                    >
                        Body Spray
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={(e) => setFilter({ ...filter, mainCategory: "gift" })}
                    >
                        Gift
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={(e) => setFilter({ ...filter, mainCategory: "combo" })}
                    >
                        Combos
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={(e) => setFilter({ ...filter, mainCategory: "perfume" })}
                    >
                        Perfumes
                    </Dropdown.Item>
                </Dropdown>

                <Dropdown
                    label="Size"
                    className="bg-white border border-black"
                >
                    <Dropdown.Item onClick={() => setFilter({ ...filter, size: "" })}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter({ ...filter, size: "10ml" })}>10 ml</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter({ ...filter, size: "50ml" })}>50 ml</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter({ ...filter, size: "100ml" })}>100 ml</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter({ ...filter, size: "150ml" })}>150 ml</Dropdown.Item>
                </Dropdown>
                <Dropdown label="price" className="bg-white border border-black">

                    <Dropdown.Item
                        onClick={() =>
                            setFilter({ ...filter, price: "" })
                        }
                    >
                        All
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() =>
                            setFilter({ ...filter, price: { gt: 1000, lt: 2000 } })
                        }
                    >
                        1000-2000
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() =>
                            setFilter({ ...filter, price: { gt: 2000, lt: 3000 } })
                        }
                    >
                        2000-3000
                    </Dropdown.Item>
                </Dropdown>

                <Dropdown
                    label="Display Gender"
                    dismissOnClick={false}
                    className="bg-white border border-black"
                >
                    <Dropdown.Item onClick={() => setFilter({ ...filter, gender: "" })}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter({ ...filter, gender: "male" })}>Male</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter({ ...filter, gender: "female" })}>Female</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter({ ...filter, gender: "kids" })}>Kids</Dropdown.Item>
                </Dropdown>
            </div >
            <div className="container mx-auto px-4 py-3">
                <div className="relative pb-4 ">
                    <img
                        src="../../public/shop.png"
                        alt="Shop Image"
                        className="w-full "
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <i className="text-white text-5xl font-bold title"> SHOP </i>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {allData.map((item) => (
                        <Cardcom key={item._id} item={item} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
