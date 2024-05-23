import React, { useEffect, useState } from 'react'
import { instanceApi } from '../../Api/axiosconfig';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function ProductTable() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                let { data } = await instanceApi.get('/product/getAll');
                setProducts(data?.data || []);
                // console.log('Fetched products:', data?.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);



    return (
        <div className="overflow-x-auto mt-10">
            <Table>
                <TableHead>

                    <TableHeadCell>Sr.no</TableHeadCell>
                    <TableHeadCell>Image</TableHeadCell>
                    <TableHeadCell>Product name</TableHeadCell>
                    <TableHeadCell>Description</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>Color</TableHeadCell>
                    <TableHeadCell>Gender</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                    <TableHeadCell>Rating</TableHeadCell>

                    <TableHeadCell>
                        <span className="sr-only">Edit</span>
                    </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">

                    {products.map((product, index) => (
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover" />
                            </TableCell>

                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {product.title}
                            </TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.category.join(', ')}</TableCell>
                            <TableCell>{product.color.join(', ')}</TableCell>
                            <TableCell>{product.gender}</TableCell>
                            <TableCell>${product.price} ({product.discountPercentage}% off)</TableCell>
                            <TableCell>{product.rating}</TableCell>
                            <TableCell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
