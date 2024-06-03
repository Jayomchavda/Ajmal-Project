import React, { useEffect, useState } from 'react'
import { instanceApi } from '../../Ui/Api/axiosconfig';
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function User() {
    const [user, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await instanceApi.get('/user/getAll');
                setUsers(response?.data?.data || []);
                console.log('Fetched Users:', response.data?.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers()
    }, []);


    const deleteHandler = (index) => {
        let filterData = users.filter((e, i) => i !== index)
        setUsers(filterData);
    }


    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHead>
                    <TableHeadCell>Sr.no</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Email ID</TableHeadCell>
                    <TableHeadCell>Age</TableHeadCell>
                    <TableHeadCell>UserType</TableHeadCell>
                    <TableHeadCell>Number</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>

                </TableHead>
                <TableBody className="divide-y">
                    {
                        user?.map((user, index) => {
                            return <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user?.name}
                                </TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user?.age}</TableCell>
                                <TableCell>{user?.userType}</TableCell>
                                <TableCell>{user?.number}</TableCell>
                                <TableCell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        <Button role='button' onClick={() => deleteHandler(i)}>  Delete</Button>
                                    </a>
                                </TableCell>
                            </TableRow>
                        })
                    }

                </TableBody>
            </Table>
        </div>
    )
}
