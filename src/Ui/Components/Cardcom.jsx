import { Button } from "flowbite-react";
import React from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { instanceApi } from "../Api/axiosconfig";
import { ShoppingCart } from "react-feather";
import { toast } from "react-toastify";

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
                // console.log("responce=-==-=-=-=-=-=>-", response);
            } catch (error) {
                // console.log("-----------  error----------->", error);
            }
        }
    };

    const originalPrice = parseFloat(item?.price);
    const discountPercentage = parseFloat(item?.discountPercentage);
    const discountedPrice = (originalPrice * (1 - discountPercentage / 100)).toFixed(2);




    const buyNowHandler = () => {
        if (!cookies.token) {
            return navigate("/login");
        } else {
            navigate(`/buy/${item._id}`);
        }
    };


    return (
        <div className="p-1 mt-5 ">
            <div
                className=" p-4 mt-5 rounded-lg"
                style={{ backgroundColor: item?.cardcolor || item.cardcolor }}
            >
                <NavLink to={`/product/${item?._id}`}>
                    <div className="cursor-pointer">
                        <div className="product-img  h-[300px] p-2 rounded-lg text-center ">
                            <img
                                src={item?.thumbnail || item?.image_url}
                                alt=""
                                srcSet=""
                                className="m-auto h-[300px]  content-center  "
                            />
                        </div>
                        <div className="mb-2 p-1 pt-2 text-black ">
                            <p>{item?.mainCategorie}</p>

                            <p className="text-[15px] mt-2 text-gray-500">{item?.title || item?.details}</p>
                            <h2 className="text-[22px] mt-1 card-title title single-line-ellipsis">
                                {item?.description || item?.brand}
                            </h2>
                            <div className="flex gap-2">
                                {
                                    item?.size?.length > 0 ? item.size?.map((e) => {
                                        return <span className="border px-2 py-1 rounded-md">{e}</span>
                                    }) : "N/A"
                                }
                            </div>
                            <p className="py-2">
                                <p className="mr-2 text-gray-500">{item?.discountPercentage || item?.percentage}% off</p>
                                <p className="mr-2 text-gray-500">
                                    <del>₹ {originalPrice || item?.delprice}</del>
                                </p>
                                <p className="text-[20px] font-bold">₹ {discountedPrice || item?.price}</p>


                            </p>
                        </div>
                    </div>
                </NavLink>

                <div className="flex justify-center space-x-4 ">
                    {/* <Button className="btn">Buy Now</Button> */}
                    <Button className="btn" onClick={buyNowHandler}>Buy Now</Button>
                    <Button onClick={() => addCartHandler()} className="btn"> <ShoppingCart className="size-5 mr-2" />Add to Cart</Button>
                </div>
            </div>
        </div>
    );
}