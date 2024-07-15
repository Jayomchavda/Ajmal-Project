import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instanceApi } from '../Api/axiosconfig';

export default function SingleProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await instanceApi.get(`/product/${productId}`);
                setProduct(response?.data);
                // console.log("response-=-=-=---=-->", response.data)
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [productId]);


    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Price: ₹ {product.price}</p>
        </div>
    );
}
