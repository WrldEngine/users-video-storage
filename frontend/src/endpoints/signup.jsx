import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const current_endpoint = `${import.meta.env.VITE_API_URL}signup/`


export default function SignupForm() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
        errors: {},
    });

    const validateForm = () => {
        const errors = {};

        if (!formData.username) {
            errors.username = "Имя пользователя не указано";
        }

        if (!formData.first_name) {
            errors.first_name = "Имя не указано";
        }

        if (!formData.last_name) {
            errors.last_name = "Фамилия не указана";
        }

        if (!formData.email) {
            errors.email = "Почта не указана"
        }

        if (!formData.password) {
            errors.password = "Пароль пользователя не указан";
        }

        setFormData((prevState) => ({ ...prevState, errors }));

        return Object.keys(errors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        const errors = {};
        event.preventDefault();

        if (validateForm()) {
            try {
                await axios.post(current_endpoint, formData);
                navigate("/login");

            } catch (error) {
                errors.auth = "Имя пользователя занято";
                setFormData((prevState) => ({ ...prevState, errors }));
            }
        }
    };

    return (
        <div className="container col-sm-3" data-bs-theme="dark">
            <h2 className='text-warning text-center mb-4'>Sign Up</h2>

            <Form onSubmit={handleSubmit}>
                {formData.errors.auth && (
                    <p className="text-danger">{formData.errors.auth}</p>
                )}

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formFname">
                        <Form.Label className='text-info'>First Name</Form.Label>
                        <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                        {formData.errors.first_name && (
                            <p className="text-danger">{formData.errors.first_name}</p>
                        )}
                    </Form.Group>

                </Row>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formLname">
                        <Form.Label className='text-info'>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                        {formData.errors.last_name && (
                            <p className="text-danger">{formData.errors.last_name}</p>
                        )}
                    </Form.Group>

                </Row>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formUsername">
                        <Form.Label className='text-info'>Username</Form.Label>
                        <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                        {formData.errors.username && (
                            <p className="text-danger">{formData.errors.username}</p>
                        )}
                    </Form.Group>

                </Row>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formEmail">
                        <Form.Label className='text-info'>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                        {formData.errors.email && (
                            <p className="text-danger">{formData.errors.email}</p>
                        )}
                    </Form.Group>

                </Row>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formPassword">
                        <Form.Label className='text-info'>Password</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                        {formData.errors.password && (
                            <p className="text-danger">{formData.errors.password}</p>
                        )}
                    </Form.Group>

                </Row>
                <div className="text-center">
                    <Button variant="warning" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}