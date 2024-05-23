import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../component/Header/Header'
import Shop from '../component/Header/Shop'
import Home from '../component/Header/Home'
import Login from '../component/Header/Login'
import Reg from '../component/Header/Reg'
import Profile from '../component/Header/Profile'
import Ourstore from '../component/Header/Ourstore'
import AjmalStudio from '../Ui/pages/AjmalStudio'
import Order from '../Admin/Order/Order'
import Product from '../Admin/Product/Product'
import User from '../Admin/User/User'


export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/ourstore' element={<Ourstore />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Reg />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/ajmalstudio' element={<AjmalStudio />} />

                    {/* ----------- admin page ---------- */}
                    <Route path="/admin-product" element={<Product />} />
                    <Route path="/admin-user" element={<User />} />
                    <Route path="/admin-order" element={<Order />} />
                </Routes>


            </BrowserRouter>
        </div>
    )
}
