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
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {cartData?.cart?.length > 0 ? (
                    <>
                        <h1 className="text-3xl font-semibold mb-6 text-gray-700">Your Shopping Cart</h1>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-3/4">
                                {cartData?.cart?.map((item) => (
                                    <div key={item.productId._id} className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition duration-300">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-1/10 mb-4 md:mb-0">
                                                <img className="w-full h-64 object-cover rounded-lg" src={item.productId.thumbnail} alt={item.productId.title} />
                                            </div>
                                            <div className="md:w-2/3 md:pl-6">
                                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.productId.title}</h2>
                                                <p className="text-gray-600 mb-4">{item.productId.description}</p>
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <p className="text-sm"><span className="font-semibold">Brand:</span> {item.productId.brand}</p>
                                                    <p className="text-sm"><span className="font-semibold">Gender:</span> {item.productId.gender}</p>
                                                    <p className="text-sm"><span className="font-semibold">Main Category:</span> {item.productId.mainCategory}</p>
                                                    <p className="text-sm"><span className="font-semibold">Category:</span> {item.productId.category}</p>
                                                    <p className="text-sm"><span className="font-semibold">Color:</span> {item.productId.color}</p>
                                                    <p className="text-sm"><span className="font-semibold">Size:</span> {item.productId.size}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <button onClick={() => reduceQuanitiy(item.productId._id, false, item.count)} className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300 transition duration-300">-</button>
                                                        <span className="bg-gray-100 px-4 py-1">{item.count}</span>
                                                        <button onClick={() => AddQuntity(item.productId)} className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300 transition duration-300">+</button>
                                                    </div>
                                                    <div>
                                                        {/* <p className="text-lg font-semibold text-gray-800">₹{item.productId.price}</p> */}
                                                        <p className="text-sm text-green-600">Discount: {item.productId.discountPercentage}% off</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex justify-between items-center">
                                                    <p className="text-xl font-bold text-indigo-600">Total: ₹{item.count * item.productId.price}</p>
                                                    <button onClick={() => removeData(item.productId._id)} className="text-red-500 hover:text-red-700 transition duration-300">
                                                        <Trash className="h-6 w-6" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={clearCart} className="bg-red-500 hover:bg-red-600 px-6 py-2 text-white uppercase rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1">Clear Cart</button>
                            </div>
                            <div className="lg:w-1/4">
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-600">Subtotal ({calculateTotalItems()} items)</span>
                                        <span className="font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-semibold">₹4.99</span>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="flex justify-between mb-6">
                                        <span className="text-lg font-semibold text-gray-800">Total</span>
                                        <span className="text-2xl font-bold text-indigo-600">₹{(calculateSubtotal() + 4.99).toFixed(2)}</span>
                                    </div>
                                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Your cart is empty</h2>
                        <button onClick={() => navigate("/shop")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1">Start Shopping</button>
                    </div>
                )}
            </div>
        </div>
    );
}