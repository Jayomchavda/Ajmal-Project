import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instanceApi } from "../Api/axiosconfig";
import { useCookies } from "react-cookie";

import { fetchCart, updateCartItem } from "../../Redux/cartSlice";
import { useEffect } from "react";
import { Trash } from "react-feather";

export default function Cart() {
    let cartData = useSelector((store) => store.cartSlice);
    console.log("-----------  cartData----------->", cartData);

    const [cookies] = useCookies();

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchCart(cookies.token))
    }, [])

    const reduceQuanitiy = (productId, isRemove, qut) => {
        if (qut === 1) isRemove = true;
        console.log("isRemove", isRemove);
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
        ).then((res) => {
            dispatch(fetchCart(cookies.token))
        });
    };
    const AddQuntity = (productId) => {
        console.log("productId-=-=->", productId);
        console.log("cookies.token-=-=->", cookies.token);

        instanceApi.post(
            "/cart/create/" + productId._id, null,
            {
                headers: {
                    authorization: "bearer " + cookies.token,
                },
            }
        ).then((res) => {
            dispatch(fetchCart(cookies.token))
        });;

    };

    const removeData = (productId) => {
        instanceApi.put(
            "/cart/update",
            {
                _id: cartData.cartId,
                isRemove: true,
                productId: productId,
            },
            {
                headers: {
                    authorization: "bearer " + cookies.token,
                },
            }
        ).then((res) => {
            dispatch(fetchCart(cookies.token));
        });
    };

    const clearCart = () => {
        cartData.cart.forEach((item) => {
            removeData(item.productId._id);
        });
    };

    const calculateSubtotal = () => {
        return cartData.cart.reduce((total, item) => {
            return total + (item.count * item.productId.price);
        }, 0);
    };

    const calculateTotalItems = () => {
        return cartData.cart.reduce((total, item) => total + item.count, 0);
    };





    return (
        <div>
            <div className=" bg-gray-100 p-5  ">
                {cartData?.cart?.length > 0 ? (
                    <>
                        <div className="flex bg-slate-700  items-center w-full  border-1 border-black rounded-xl py-2" >
                            <h1 className="text-2xl font-bold flex-grow text-center text-white">
                                My Cart
                            </h1>
                        </div>
                        <Button className="ml-auto mt-3 bg-slate-700 p-1" onClick={clearCart}>Clear Cart</Button>

                        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 my-3">
                            <div className="rounded-lg">
                                {cartData?.cart?.map?.((e) => {
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
                                                        <span onClick={() => AddQuntity(e?.productId)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                                            +
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <p className="text-sm">
                                                            ₹ {e?.count * e?.productId?.price}
                                                        </p>

                                                        <Trash className="size-5" onClick={() => removeData(e?.productId?._id)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-6 h-full rounded-lg border-black border-2 bg-[#f3f4f6] p-6 shadow-md md:mt-0 md:w-1/3">
                                <p className="text-2xl text-left font-bold ">ORDER SUMMERY</p>
                                <hr className="mb-4" />

                                <div className="bg-white p-3 rounded-2xl">
                                    <div className="mb-2 flex justify-between">
                                        <p className="text-gray-700 text-left">{calculateTotalItems()} Products</p>
                                    </div>
                                    <div className="mb-2 flex justify-between">
                                        <p className="text-gray-700">Sub-total</p>
                                        <p className="text-gray-700">₹{calculateSubtotal().toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-700">Shipping</p>
                                        <p className="text-gray-700">₹4.99</p>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="flex justify-between">
                                        <p className="text-lg font-bold "> Order Total</p>
                                        <div className="">
                                            <p className="mb-1 text-lg font-bold">₹{(calculateSubtotal() + 4.99).toFixed(2)}</p>
                                            {/* <p className="text-sm text-gray-700">including VAT</p> */}
                                        </div>
                                    </div>

                                </div>
                                <button className="mt-6 w-full rounded-md  py-1.5 font-medium text-blue-50  bg-slate-700">
                                    Check out
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-3 flex-col">
                        <h1>Please add some data</h1>
                        <Button onClick={() => navigate("/shop")}>shop now</Button>
                    </div>
                )}
            </div>
        </div >
    );
}