import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instanceApi } from '../Api/axiosconfig';
import { toast } from 'react-toastify';

export default function SingleProduct() {
    const data = useParams();
    const [product, setProduct] = useState("");
    // console.log("--->data", data)
    console.log("product-=-=--=>", product)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await instanceApi.get(`/product/getProductById/${data?.id}`);
                setProduct(response?.data);
                // console.log("response-=-=-=---=-->", response.data)
            } catch (error) {
                console.log("Error fetching product:", error);
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
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img src={product.data.thumbnail} alt={product.data.title} className="max-w-full max-h-full object-contain rounded shadow-md" />
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-6 text-left ">
                    <h1 className="text-2xl font-bold mb-2">{product.data.title}</h1>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Brand:</span> {product.data.brand}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Category:</span> {product.data.category}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Color:</span> {product.data.color}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Description:</span> {product.data.description}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Size:</span> {product.data.size}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Discount:</span> {product.data.discountPercentage}%</p>
                    <p className="text-gray-800 font-bold text-xl mt-2">Price: ₹ {product.data.price}</p>
                </div>
            </div>
        </div>

    );
}
