import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instanceApi } from "../Api/axiosconfig";
import { useCookies } from "react-cookie";

import { fetchCart, updateCartItem } from "../../Redux/cartSlice";
import { useEffect } from "react";
import { ShoppingBag, Trash } from "react-feather";

export default function Cart() {
    let cartData = useSelector((store) => store.cartSlice);
    // console.log("-----------  cartData----------->", cartData);

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
        return cartData?.cart?.reduce((total, item) => {
            return total + (item.count * item?.productId?.price);
        }, 0);
    };

    const calculateTotalItems = () => {
        return cartData.cart.reduce((total, item) => total + item.count, 0);
    };


    return (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-8">
            {cartData?.cart?.length > 0 ? (
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                            <h1 className="text-3xl font-extrabold text-white flex items-center justify-center">
                                <ShoppingBag className="mr-3 h-8 w-8" /> My Shopping Cart
                            </h1>
                        </div>

                        <div className="p-6">
                            <Button
                                className="ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </Button>

                            <div className="mt-8 space-y-6">
                                {cartData?.cart?.map((e) => (
                                    <div key={e?.productId?._id} className="flex flex-col md:flex-row bg-gray-50 rounded-xl shadow-md overflow-hidden">
                                        {/* <img
                                        src={e?.productId?.thumbnail}
                                        alt="product-image"
                                        className="h-64 w-full md:w-1/3 object-cover"
                                    /> */}
                                        <div className="md:w-1/13 mb-4 md:mb-6">
                                            <img className="w-full h-64 object-cover rounded-lg" src={e?.productId?.thumbnail} alt={e?.productId.title} />
                                        </div>

                                        <div className="p-6 flex-grow">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{e?.productId?.title}</h2>
                                            <p className="text-gray-600 mb-4">{e?.productId?.description}</p>
                                            <div className="grid grid-cols-2 gap-4 text-[16px]">
                                                <p><span className="font-semibold">Brand:</span> {e?.productId?.brand}</p>
                                                <p><span className="font-semibold">Gender:</span> {e?.productId?.gender}</p>
                                                <p><span className="font-semibold">Category:</span> {e?.productId?.category}</p>
                                                <p><span className="font-semibold">Color:</span> {e?.productId?.color}</p>
                                                <p><span className="font-semibold">Size:</span> {e?.productId?.size}</p>
                                                <p className="text-green-600 font-semibold"> Discount: {e?.productId?.discountPercentage}% off</p>
                                            </div>
                                            <div className="mt-6 flex items-center justify-between">
                                                <p className="text-2xl font-bold text-purple-600">₹ {e?.productId?.price}</p>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => reduceQuanitiy(e?.productId?._id, false, e.count)}
                                                        className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-semibold text-lg">{e?.count}</span>
                                                    <button
                                                        onClick={() => AddQuntity(e?.productId)}
                                                        className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <p className="text-lg font-semibold text-gray-800">Total: ₹ {e?.count * e?.productId?.price}</p>
                                                <Button
                                                    onClick={() => removeData(e?.productId?._id)}
                                                    className=" bg-red-600  "
                                                >
                                                    <Trash className="h-6 w-6" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                            <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Subtotal ({calculateTotalItems()} items)</p>
                                    <p className="font-semibold">₹{calculateSubtotal().toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Shipping</p>
                                    <p className="font-semibold">₹4.99</p>
                                </div>
                                <div className="border-t pt-4 flex justify-between items-center">
                                    <p className="text-xl font-bold text-gray-800">Order Total</p>
                                    <p className="text-2xl font-bold text-purple-600">₹{(calculateSubtotal() + 4.99).toFixed(2)}</p>
                                </div>
                            </div>
                            <button className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Your cart is empty</h1>
                    <Button
                        onClick={() => navigate("/shop")}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Start Shopping
                    </Button>
                </div>
            )}
        </div>
    );
}