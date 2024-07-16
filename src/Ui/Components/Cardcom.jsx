import { Button } from "flowbite-react";
import React from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { instanceApi } from "../Api/axiosconfig";

export default function Cardcom({ item }) {
    const [cookies] = useCookies();
    const navigate = useNavigate();

    const addCartHandler = async () => {
        if (!cookies.token) {
            return navigate("/login");
        } else {
            try {
                let response = await instanceApi.post(
                    "/cart/create/" + item._id,
                    null,
                    {
                        headers: {
                            authorization: "bearer " + cookies.token,
                        },
                    }
                );
                console.log("responce=-==-=-=-=-=-=>-", response);
            } catch (error) {
                console.log("-----------  error----------->", error);
            }
        }
    };


    const originalPrice = parseFloat(item.price);
    const discountPercentage = parseFloat(item.discountPercentage);
    const discountedPrice = (originalPrice * (1 - discountPercentage / 100)).toFixed(2);




    return (
        <div className="p-1 mt-5 ">
            <NavLink to={`/product/${item._id}`}>

                <div
                    className=" p-4 mt-5 rounded-lg"
                    style={{ backgroundColor: item.cardcolor }}
                >
                    <div className="cursor-pointer">
                        <a
                            style={{
                                width: "32px",
                                height: "32px",
                                lineHeight: "26px",
                                background: "#bc8b573d",
                                borderRadius: "100px",
                                display: "flex",
                                marginLeft: "auto",
                                padding: "8px",
                            }}
                            className="product-wishlist"
                        >
                            <img
                                src="https://in.ajmal.com/IconLike-9bG.svg"
                                alt="wishlist"
                                style={{ width: "100%", height: "auto" }}
                            />
                        </a>
                        <div className="product-img  h-[300px] p-2 rounded-lg text-center ">
                            <img
                                src={item?.thumbnail}
                                alt=""
                                srcSet=""
                                className="m-auto h-[300px]  content-center  "
                            />
                        </div>
                        <div className="mb-2 p-1 pt-2 text-black ">
                            <p>{item?.mainCategorie}</p>
                            <p className=" ">
                                {item?.percentage}
                            </p>
                            <p className="text-[15px] mt-2 text-gray-500">{item?.title}</p>
                            <h2 className="text-[22px] mt-1 card-title title single-line-ellipsis">
                                {item?.description}
                            </h2>
                            <div className="flex gap-2">
                                {
                                    item?.size?.length > 0 ? item.size?.map((e) => {
                                        return <span className="border px-2 py-1 rounded-md">{e}</span>
                                    }) : "N/A"
                                }
                            </div>
                            {/* <p>{item?.size?.length > 0 ? item.size?.join("--") : "N/A"}</p> */}
                            {/* <p>{item?.gender}  </p> */}
                            {/* <p>{item?.brand}</p> */}
                            <p className="py-2">
                                <p className="mr-2 text-gray-500">{item?.discountPercentage}% off</p>
                                <p className="mr-2 text-gray-500">
                                    <del>₹ {originalPrice}</del>
                                </p>
                                <p className="text-[20px] font-bold">₹ {discountedPrice}</p>
                            </p>
                            <div className="flex  justify-center space-x-4 ">
                                <Button className="btn">Buy Now</Button>
                                <Button onClick={() => addCartHandler()} className="btn">Add to Cart</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </NavLink>



        </div >
    );
}
