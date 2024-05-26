import { Button, Select } from 'flowbite-react';
import React, { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import ReactSelect from "react-select";

const options = [
    { label: "Strong", value: "strong" },
    { label: "Woodi", value: "woodi" },
    { label: "Aqua", value: "aqua" },
    { label: "Light", value: "light" },
    { label: "Cold", value: "cold" },
];

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
    let [userArr, setUserArr] = useState([]);
    let [gender, setGender] = useState("");
    let [colorArr, setColorArr] = useState([]);




    const multiSelectHandler = (e) => {
        console.log("----e----", e);
        let data = e.map((e) => e.value);
        setColorArr(data);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setUserArr([...userArr, formData])
        setFormData({
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
        })
        console.log("Form Data:", formData);
    };


    const CheckboxHandler = (value, e) => {
        if (e.target.checked) {
            setFormData({ ...formData, size: [...formData.size, value] })
        } else {
            let filterData = formData.size.filter((e) => e !== value)
            setFormData({ ...formData, size: filterData })
        }
    };



    return (
        <>
            <div className='flex justify-center items-center'>
                <div className='w-[50%] border border-black p-5'>
                    <h2 className='text-[30px]'>Add Product From</h2 >
                    <Form className='text-left' onSubmit={(e) => submitHandler(e)} >
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                value={formData?.title}
                                onChange={(e) => setFormData({ ...formData, title: e?.target?.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                id="description"
                                name="description"
                                type="text"
                                value={formData?.description}
                                onChange={(e) => setFormData({ ...formData, description: e?.target?.value })}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e?.target?.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="discountPercentage">Discount Percentage</Label>
                            <Input
                                id="discountPercentage"
                                name="discountPercentage"
                                type="text"
                                value={formData.discountPercentage}
                                onChange={(e) => setFormData({ ...formData, discountPercentage: e?.target?.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="availableStock">Available Stock</Label>
                            <Input
                                id="availableStock"
                                name="availableStock"
                                type="text"
                                value={formData.availableStock}
                                onChange={(e) => setFormData({ ...formData, availableStock: e?.target?.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="brand">Brand</Label>
                            <Input
                                id="brand"
                                name="brand"
                                type="text"
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e?.target?.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mainCategorie">Category</Label>

                            <ReactSelect
                                isMulti
                                className="w-[300px]"
                                options={options}
                                value={colorArr?.map?.((e) => {
                                    return { label: e.toUpperCase(), value: e };
                                })}
                                onChange={(e) => multiSelectHandler(e)}
                            // onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mainCategorie">Main category</Label>
                            <Select
                                id="mainCategorie"
                                name="mainCategorie"
                                value={formData.mainCategorie}
                                onChange={(e) => setFormData({ ...formData, mainCategorie: e.target.value })}
                            >
                                <option value="">Select a main category</option>
                                <option value="United States">Combo</option>
                                <option value="Canada">Attar</option>
                                <option value="France">Gift</option>
                                <option value="Germany">BodySpray</option>
                                <option value="Germany">BodyMist</option>
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
                                        checked={gender === "male"}
                                        onChange={() => setGender("male")}
                                    />

                                    <Label check>Male</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={() => setGender("female")}

                                    />

                                    <Label check>Female</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="gender"
                                        type="radio"
                                        value="kids"
                                        checked={gender === "kids"}
                                        onChange={() => setGender("kids")}
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
                                        onChange={(e) => CheckboxHandler("50ml", e)}

                                    />
                                    <Label check>50ml</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="checkbox"
                                        value="100ml"
                                        checked={formData.size.includes("100ml")}
                                        onChange={(e) => CheckboxHandler("100ml", e)}

                                    />
                                    <Label check>100ml</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="checkbox"
                                        value="150ml"
                                        checked={formData.size.includes("150ml")}
                                        onChange={(e) => CheckboxHandler("150ml", e)}


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
                                onChange={(e) => setFormData({ ...formData, thumbnail: e?.target?.value })}
                            />
                        </FormGroup>
                        <div className="flex justify-center">
                            <Button onClick={() => submitHandler(e)} type="submit" className='w-[30%] ' >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}
