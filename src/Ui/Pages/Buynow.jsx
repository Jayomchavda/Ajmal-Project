import React, { useState } from 'react'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

export default function Buynow() {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        address: '',
        town: '',
        landmark: '',
        pincode: '',
        state: '',
        alternatenum: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.number) newErrors.number = 'Mobile number is required';
        else if (!/^\d{10}$/.test(formData.number)) newErrors.number = 'Invalid mobile number. Please enter 10 digits only.';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.town) newErrors.town = 'City/District/Town is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';
        if (!formData.state) newErrors.state = 'State is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form is valid', formData);
            // Submit the form data
        } else {
            console.log('Form is invalid');
        }
    };

    return (
        <div className='flex justify-center items-center mt-2'>
            <Form className='p-5 bg-[#f5faff] ' onSubmit={handleSubmit}>
                <h2 className='text-left text-blue-600 mb-3'>Add a new Address</h2>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                id="examplename"
                                name="name"
                                placeholder="Name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="text-red-500">{errors.name}</span>}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                id="exampleNumber"
                                name="number"
                                placeholder="10-digit mobile number"
                                type="text"
                                value={formData.number}
                                onChange={handleChange}
                                maxLength={10}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                            {errors.number && <span className="text-red-500">{errors.number}</span>}
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup className='my-2'>
                    <Input
                        id="exampleAddress"
                        name="address"
                        placeholder="Address (Area and State)"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {errors.address && <span className="text-red-500">{errors.address}</span>}
                </FormGroup>

                <Row >
                    <Col md={7} >
                        <FormGroup className='my-2'>
                            <Input
                                id="exampleTown"
                                name="town"
                                placeholder="City/District/Town"
                                value={formData.town}
                                onChange={handleChange}
                            />
                            {errors.town && <span className="text-red-500">{errors.town}</span>}
                        </FormGroup>
                        <FormGroup >
                            <Input
                                id="exampleLandmark"
                                name="landmark"
                                placeholder='Landmark (Optional)'
                                value={formData.landmark}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup >
                            <Input
                                id="examplePincode"
                                name="pincode"
                                placeholder='Pincode'
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                            {errors.pincode && <span className="text-red-500">{errors.pincode}</span>}
                        </FormGroup>
                    </Col>
                    <Col md={5} className='my-2'>
                        <FormGroup>
                            <Input
                                id="exampleState"
                                name="state"
                                type="select"
                                value={formData.state}
                                onChange={handleChange}
                            >
                                <option value="">---Select a state---</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Ladakh">Ladakh</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                            </Input>
                            {errors.state && <span className="text-red-500">{errors.state}</span>}
                        </FormGroup>
                    </Col>
                    <Row >
                        <Col md={8} className='my-2'>
                            <FormGroup>
                                <Input
                                    id="alternatenum"
                                    name="alternatenum"
                                    placeholder="Alternate Phone (Optional)"
                                    type="text"
                                    value={formData.alternatenum}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Row>
                <div className='text-left mt-3 '>
                    <button type="submit" className='bg-[#fb641b] text-white p-2'>
                        SAVE AND DELIVER HERE
                    </button>
                    <button type="button" className='bg-[#f5faff] text-blue-700 p-2 ml-4'>
                        CANCEL
                    </button>
                </div>
            </Form>
        </div>
    )
}