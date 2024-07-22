import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instanceApi } from '../Api/axiosconfig';
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';
import { useCookies } from 'react-cookie';

export default function SingleProduct() {
    const data = useParams();
    const [product, setProduct] = useState("");
    console.log("product-=-=--=>", product)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await instanceApi.get(`/product/getProductById/${data?.id}`);
                setProduct(response?.data);
                // console.log("response-=-=-=---=-->", response.data)
            } catch (error) {
                // console.log("Error fetching product:", error);
                toast.error("Product not found");
            }
        };
        fetchProduct();
        // console.log("fetchProduct-=-=-->", fetchProduct)

    }, [data]);

    if (!product) {
        return <div>Loading...</div>;
    }





    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center md:items-start w-full md:w-[100%] mx-auto">
                <div className="w-[650px] h-[450px] flex justify-center items-center">
                    <img src={product.data.thumbnail} alt={product.data.title} className="max-w-full max-h-full object-contain rounded shadow-md" />
                </div>
                <div className="w-full md:w-3/7 mt-4 md:mt-0 md:ml-6 text-left">
                    <h1 className="text-3xl font-bold mb-2">{product.data.title}</h1>
                    <p className="text-gray-500 text-2xl mb-1"><span className="font-semibold">Description:</span> {product.data.description}</p>

                    <p className="text-gray-500 text-[20px] mb-1"><span className="font-semibold">Brand:</span> {product.data.brand}</p>

                    <p className="text-gray-500 text-[20px] mb-1"><span className="font-semibold">Gender:</span> {product.data.gender}</p>

                    <p className="text-gray-500 text-[20px] mb-1"><span className="font-semibold">Main Category:</span> {product.data.mainCategory}</p>

                    <div className="flex gap-2">
                        <label className="text-gray-500 text-[20px] mb-1 font-bold">Category:</label>
                        {
                            product?.data?.category?.length > 0 ? product?.data?.category?.map((e) => {
                                return <span className="border-black border-1 px-2 py-1 rounded-md">{e}</span>
                            }) : "N/A"
                        }
                    </div>
                    <div className="flex gap-2 mt-2">
                        <label className="text-gray-500 text-[20px] mb-1 font-bold">Color:</label>
                        {
                            product?.data?.color?.length > 0 ? product?.data?.color?.map((e) => {
                                return <span className="border-black border-1 px-2 py-1 rounded-md">{e}</span>
                            }) : "N/A"
                        }
                    </div>

                    <div className="flex gap-2 mt-2">
                        <label className="text-gray-500 text-[20px] mb-1 font-bold">Size:</label>
                        {
                            product?.data?.size?.length > 0 ? product?.data?.size?.map((e) => {
                                return <span className="border-black border-1 px-2 py-1 rounded-md">{e}</span>
                            }) : "N/A"
                        }
                    </div>

                    <p className="text-gray-500 text-[20px] mt-1"><span className="font-semibold">Discount:</span> {product.data.discountPercentage}% off</p>



                    <p className="text-gray-800 font-bold text-2xl mt-2">Price: ₹ {product?.data?.price}</p>
                </div>
            </div>



        </div>

    );
}
