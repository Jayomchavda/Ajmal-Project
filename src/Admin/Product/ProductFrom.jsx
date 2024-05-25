import { Button, Select } from 'flowbite-react';
import React, { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

export default function ProductForm() {
    const [formData, setFormData] = useState({
        gender: "",
        title: "",
        description: "",
        price: "",
        discountPercentage: "",
        availableStock: "",
        brand: "",
        category: "",
        mainCategorie: "",
        size: [],
        thumbnail: "",
    });



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prevData) => ({
                ...prevData,
                size: checked
                    ? [...prevData.size, value]
                    : prevData.size.filter((size) => size !== value),
            }));
        } else if (type === "radio") {
            setFormData((prevData) => ({
                ...prevData,
                gender: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <>

            <div className='flex justify-center items-center'>
                <div className='w-[50%] border border-black p-5'>
                    <h2 className='text-[30px]'>Add Product From</h2 >
                    <Form className='text-left' onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                id="description"
                                name="description"
                                type="text"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                type="text"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="discountPercentage">Discount Percentage</Label>
                            <Input
                                id="discountPercentage"
                                name="discountPercentage"
                                type="text"
                                value={formData.discountPercentage}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="availableStock">Available Stock</Label>
                            <Input
                                id="availableStock"
                                name="availableStock"
                                type="text"
                                value={formData.availableStock}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="brand">Brand</Label>
                            <Input
                                id="brand"
                                name="brand"
                                type="text"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <Select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="France">France</option>
                                <option value="Germany">Germany</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="mainCategorie">Main category</Label>
                            <Select
                                id="mainCategorie"
                                name="mainCategorie"
                                value={formData.mainCategorie}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a main category</option>
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="France">France</option>
                                <option value="Germany">Germany</option>
                            </Select>
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <Label for="gender">Gender</Label>
                            <div className='flex gap-3'>
                                <FormGroup check>
                                    <Input
                                        name="gender"
                                        type="radio"
                                        value="male"
                                        checked={formData.gender === "male"}
                                        onChange={handleChange}
                                    />
                                    <Label check>Male</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        checked={formData.gender === "female"}
                                        onChange={handleChange}
                                    />
                                    <Label check>Female</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="gender"
                                        type="radio"
                                        value="kids"
                                        checked={formData.gender === "kids"}
                                        onChange={handleChange}
                                    />
                                    <Label check>Kids</Label>
                                </FormGroup>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Size</Label>
                            <div className='flex gap-3'>
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="checkbox"
                                        value="50ml"
                                        checked={formData.size.includes("50ml")}
                                        onChange={handleChange}
                                    />
                                    <Label check>50ml</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="checkbox"
                                        value="100ml"
                                        checked={formData.size.includes("100ml")}
                                        onChange={handleChange}
                                    />
                                    <Label check>100ml</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="checkbox"
                                        value="150ml"
                                        checked={formData.size.includes("150ml")}
                                        onChange={handleChange}
                                    />
                                    <Label check>150ml</Label>
                                </FormGroup>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="thumbnail">Thumbnails</Label>
                            <Input
                                id="thumbnail"
                                name="thumbnail"
                                type="text"
                                value={formData.thumbnail}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <div className="flex justify-center">
                            <Button type="submit" className='w-[30%] ' >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}
