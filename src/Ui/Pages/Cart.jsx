import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instanceApi } from "../Api/axiosconfig";
import { useCookies } from "react-cookie";

import { updateCartItem } from "../../Redux/cartSlice";

export default function Cart() {
    let cartData = useSelector((store) => store.cartSlice);
    console.log("-----------  cartData----------->", cartData);

    const [cookies] = useCookies();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reduceQuanitiy = (productId, isRemove, qut) => {
        console.log("-----------  qut----------->", qut);
        if (qut < 1) {
            isRemove = true;
        }
        instanceApi.put(
            "/cart/update",
            {
                _id: cartData.cartId,
                isRemove: isRemove,
                productId: productId,
            },
            {
                headers: {
                    authorization: "bearer " + cookies.token,
                },
            }
        );
    };


    // const increaseQuantity = (productId, qut) => {
    //     console.log("-----------  qut----------->", qut);
    //     instanceApi.put(
    //         "/cart/update",
    //         {
    //             _id: cartData.cartId,
    //             productId: productId,
    //             quantity: qut + 1,
    //         },
    //         {
    //             headers: {
    //                 authorization: "bearer " + cookies.token,
    //             },
    //         }
    //     );
    // };

    const increaseQuantity = (productId, qut) => {
        console.log("-----------  qut----------->", qut);
        dispatch(updateCartItem({
            token: cookies.token,
            cartId: cartData.cartId,
            productId: productId,
            quantity: qut + 1,
        }));
    };

    return (
        <div>
            <div className=" bg-gray-100 pt-20  ">
                {cartData?.cart?.length > 0 ? (
                    <>
                        <div className="flex justify-center ">
                            <div className="flex justify-between ">
                                <h1 className="mb-10 text-center text-2xl font-bold">
                                    Cart Items
                                </h1>
                                <div>
                                    <Button color={"red"}>Clear Cart</Button>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                            <div className="rounded-lg">
                                {cartData?.cart?.map?.((e) => {
                                    e.count;
                                    console.log("-=-=-new E-=-=> ", e)
                                    return (
                                        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                            <img
                                                src={e?.productId?.thumbnail}
                                                alt="product-image"
                                                className="h-12 rounded-lg "
                                            />
                                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                <div className="mt-5 sm:mt-0">
                                                    <h2 className="text-lg font-bold text-gray-900">
                                                        {e?.productId?.title}
                                                    </h2>
                                                    <p >{e?.productId?.mainCategory}</p>

                                                    <p>{e?.productId?.gender}  </p>
                                                    <p>{e?.productId?.brand}</p>


                                                    <p className="mt-1 text-xs text-gray-700">
                                                        ₹ {e?.productId?.price}
                                                    </p>
                                                </div>
                                                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                    <div className="flex items-center border-gray-100">
                                                        <span
                                                            onClick={() =>
                                                                reduceQuanitiy(
                                                                    e?.productId?._id,
                                                                    false,
                                                                    e.count
                                                                )
                                                            }
                                                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                        >
                                                            -
                                                        </span>
                                                        <p
                                                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                                            type="number"
                                                            value="2"
                                                            min="1"
                                                        >
                                                            {e?.count}
                                                        </p>
                                                        <span onClick={() => increaseQuantity(e?.productId?._id, e.count)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                                            +
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <p className="text-sm">
                                                            ₹ {e?.count * e?.productId?.price}
                                                        </p>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                <div className="mb-2 flex justify-between">
                                    <p className="text-gray-700">Subtotal</p>
                                    <p className="text-gray-700">₹129.99</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700">Shipping</p>
                                    <p className="text-gray-700">₹4.99</p>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold">Total</p>
                                    <div className="">
                                        <p className="mb-1 text-lg font-bold">₹134.98</p>
                                        <p className="text-sm text-gray-700">including VAT</p>
                                    </div>
                                </div>
                                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                                    Check out
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-3 flex-col">
                        <h1>Please add some data</h1>
                        <Button onClick={() => navigate("/product/all")}>shop now</Button>
                    </div>
                )}
            </div>
        </div >
    );
}