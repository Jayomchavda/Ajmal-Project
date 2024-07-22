import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AjmalStudio from '../Ui/Components/AjmalStudio'
import Order from '../Admin/Order/Order'
import Product from '../Admin/Product/Product'
import User from '../Admin/User/User'
import ProductFrom from '../Admin/Product/ProductFrom'
import Header from '../Ui/Components/Header'
import Shop from '../Ui/Pages/Shop'
import Home from '../Ui/Pages/Home'
import Login from '../Ui/Pages/Login'
import Reg from '../Ui/Pages/Reg'
import Profile from '../Ui/Pages/Profile'
import Ourstore from '../Ui/Pages/Ourstore'
import Cart from '../Ui/Pages/Cart'
import About from '../Ui/Pages/About'
import SingleProduct from '../Ui/Pages/SingleProduct'
import Buynow from '../Ui/Pages/Buynow'


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
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/about' element={<About />} />
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/buy/:itemId" element={<Buynow />} />



                    {/* ----------- admin page ---------- */}
                    <Route path="/admin-product" element={<Product />} />
                    <Route path="/admin-product-form" element={<ProductFrom />} />
                    <Route path="/admin-user" element={<User />} />
                    <Route path="/admin-order" element={<Order />} />
                </Routes>

            </BrowserRouter>
        </div>
    )
}
