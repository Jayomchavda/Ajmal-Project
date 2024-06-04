import { Button, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { instanceApi } from "../../Ui/Api/axiosconfig";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const options = [
    { label: "Strong", value: "strong" },
    { label: "Woodi", value: "woodi" },
    { label: "Aqua", value: "aqua" },
    { label: "Light", value: "light" },
    { label: "Cold", value: "cold" },
];

const initialProduct = {
    gender: "",
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    availableStock: "",
    brand: "",
    category: [],
    mainCategorie: "",
    size: [],
    thumbnail: "",
};
export default function ProductForm() {
    const [formData, setFormData] = useState(initialProduct);
    const multiSelectHandler = (e) => {
        let data = e.map((e) => e.value);
        setFormData({ ...formData, category: data });
    };

    const locationData = useLocation();
    console.log("-----------  locationData----------->", locationData.state);

    useEffect(() => {
        setFormData(locationData?.state);
    }, [locationData?.state]);

    const [cookies] = useCookies(["token"]);
    let [errors, setErrors] = useState({});


    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validation()) return;
        try {
            setFormData(initialProduct);
            console.log("Form Data:", formData);
            let response = await instanceApi.post("/product/create", formData, {
                headers: {
                    authorization: "bearer " + cookies.token,
                },
            });
            if (response.data.status === 200) {
                navigate("/admin-product");
            }
        } catch (error) {
            toast.error("somthing went wrong");
        }
    };

    const CheckboxHandler = (value, e) => {
        if (e.target.checked) {
            setFormData({ ...formData, size: [...formData.size, value] });
        } else {
            let filterData = formData.size.filter((e) => e !== value);
            setFormData({ ...formData, size: filterData });
        }
    };

    const updateHandler = async (e) => {
        e.preventDefault();
        if (!validation()) return;
        try {
            setFormData(initialProduct);
            let response = await instanceApi.put(
                "/product/update/" + formData?._id,
                formData,
                {
                    headers: {
                        authorization: "bearer " + cookies.token,
                    },
                }
            );
            if (response.data.status === 200) {
                navigate("/admin-product");
                setFormData(initialProduct);
            }
            console.log("-----------  response----------->", response);
        } catch (error) {
            toast.error("somthing went wrong");
        }
    };



    // const validation = () => {
    //     let isValid = true;

    //     if (!formData?.title) {
    //         toast?.error("Please Enter your title");
    //         isValid = false;
    //     }
    //     if (!formData?.description) {
    //         toast?.error(" Please Enter your description");
    //         isValid = false;
    //     }
    //     if (!formData?.price) {
    //         toast?.error("Please Enter price");
    //         isValid = false;
    //     }
    //     if (!formData?.discountPercentage) {
    //         toast?.error("Please Enter discount percentage");
    //         isValid = false;
    //     }
    //     if (!formData?.availableStock) {
    //         toast?.error("please enter availableStoke");
    //         isValid = false;
    //     }
    //     if (!formData?.brand) {
    //         toast?.error("Pelase Enter brand");
    //         isValid = false;
    //     }
    //     if (!formData?.category || formData.category.length === 0) {
    //         toast?.error("Please select a category");
    //         isValid = false;
    //     }
    //     if (!formData?.mainCategorie) {
    //         toast?.error("Please select a main categorie");
    //         isValid = false;
    //     }
    //     if (!formData?.gender) {
    //         toast?.error("Please select a Gender");
    //         isValid = false;
    //     }
    //     if (!formData?.size || formData.size.length === 0) {
    //         toast?.error("Please select a size");
    //         isValid = false;
    //     }
    //     if (!formData?.thumbnail) {
    //         toast?.error("please enter a thumbnail");
    //         isValid = false;
    //     }

    //     return isValid;
    // };


    const validation = () => {
        if (
            !formData?.title ||
            !formData?.description ||
            !formData?.price ||
            !formData?.discountPercentage ||
            !formData?.availableStock ||
            !formData?.brand ||
            !formData?.category?.length ||
            !formData?.mainCategorie ||
            !formData?.gender ||
            !formData?.size?.length ||
            !formData?.thumbnail
        ) {
            toast?.error("Please fill the form properly");
            return false;
        }

        return true;
    };







    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-[50%]  border-black border-[1px] p-5 rounded-2xl mt-4 ">
                    <h2 className="text-[30px] font-bold">Add Product From</h2>
                    <Form className="text-left " onSubmit={(e) => submitHandler(e)}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                value={formData?.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e?.target?.value })
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                id="description"
                                name="description"
                                type="text"
                                value={formData?.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e?.target?.value })
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                type="text"
                                value={formData?.price}
                                onChange={(e) =>
                                    setFormData({ ...formData, price: e?.target?.value })
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="discountPercentage">Discount Percentage</Label>
                            <Input
                                id="discountPercentage"
                                name="discountPercentage"
                                type="text"
                                value={formData?.discountPercentage}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        discountPercentage: e?.target?.value,
                                    })
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="availableStock">Available Stock</Label>
                            <Input
                                id="availableStock"
                                name="availableStock"
                                type="text"
                                value={formData?.availableStock}
                                onChange={(e) =>
                                    setFormData({ ...formData, availableStock: e?.target?.value })
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="brand">Brand</Label>
                            <Input
                                id="brand"
                                name="brand"
                                type="text"
                                value={formData?.brand}
                                onChange={(e) =>
                                    setFormData({ ...formData, brand: e?.target?.value })
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mainCategorie">Category</Label>

                            <ReactSelect
                                isMulti
                                className="w-[300px]"
                                options={options}
                                value={formData?.category?.map?.((e) => {
                                    return { label: e.toUpperCase(), value: e };
                                })}
                                onChange={(e) => multiSelectHandler(e)}
                            />

                        </FormGroup>
                        <FormGroup>
                            <Label for="mainCategorie">Main category</Label>
                            <Select
                                id="mainCategorie"
                                name="mainCategorie"
                                value={formData?.mainCategorie}
                                onChange={(e) =>
                                    setFormData({ ...formData, mainCategorie: e?.target?.value })
                                }
                            >
                                <option value="Combo" >Combo</option>
                                <option value="Attar">Attar</option>
                                <option value="Gift">Gift</option>
                                <option value="BodySpray">BodySpray</option>
                                <option value="BodyMist">BodyMist</option>
                            </Select>
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <Label for="gender">Gender</Label>
                            <div className="flex gap-3">
                                <FormGroup check>
                                    <Input
                                        name="gender"
                                        type="radio"
                                        value="male"
                                        checked={formData?.gender === "male"}
                                        onChange={(e) =>
                                            setFormData({ ...formData, gender: e?.target?.value })
                                        }
                                    />


                                    <Label check>Male</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        checked={formData?.gender === "female"}
                                        onChange={(e) =>
                                            setFormData({ ...formData, gender: e?.target?.value })
                                        }
                                    />


                                    <Label check>Female</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="gender"
                                        type="radio"
                                        value="kids"
                                        checked={formData?.gender === "kids"}
                                        onChange={(e) =>
                                            setFormData({ ...formData, gender: e?.target?.value })
                                        }
                                    />

                                    <Label check>Kids</Label>
                                </FormGroup>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Size</Label>
                            <div className="flex gap-3">
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="checkbox"
                                        value="50ml"
                                        checked={formData?.size?.includes?.("50ml")}
                                        onChange={(e) => CheckboxHandler("50ml", e)}
                                    />
                                    <Label check>50ml</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="checkbox"
                                        value="100ml"
                                        checked={formData?.size?.includes?.("100ml")}
                                        onChange={(e) => CheckboxHandler("100ml", e)}
                                    />
                                    <Label check>100ml</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="checkbox"
                                        value="150ml"
                                        checked={formData?.size?.includes?.("150ml")}
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
                                value={formData?.thumbnail}
                                onChange={(e) =>
                                    setFormData({ ...formData, thumbnail: e?.target?.value })
                                }
                            />
                        </FormGroup>
                        <div className="flex justify-center">
                            {locationData?.state ? (
                                <Button
                                    onClick={(e) => updateHandler(e)}
                                    type="submit"
                                    className="w-[50%] mt-2"
                                >
                                    Update
                                </Button>
                            ) : (
                                <Button
                                    onClick={(e) => submitHandler(e)}
                                    type="submit"
                                    className="w-[50%] mt-2"
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}