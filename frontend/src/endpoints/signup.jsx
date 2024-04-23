import React, { useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            {formData.errors.auth && (
                <p style={{ color: "red" }}>{formData.errors.auth}</p>
            )}
            <label>
                Username:
                <input type='text' name='username' value={formData.username} onChange={handleChange} />
                {formData.errors.username && (
                    <p style={{ color: "red" }}>{formData.errors.username}</p>
                )}
            </label>
            <label>
                First Name:
                <input type='text' name='first_name' value={formData.first_name} onChange={handleChange} />
                {formData.errors.first_name && (
                    <p style={{ color: "red" }}>{formData.errors.first_name}</p>
                )}
            </label>
            <label>
                Last Name:
                <input type='text' name='last_name' value={formData.last_name} onChange={handleChange} />
                {formData.errors.last_name && (
                    <p style={{ color: "red" }}>{formData.errors.last_name}</p>
                )}
            </label>
            <label>
                Email:
                <input type='email' name='email' value={formData.email} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type='password' name='password' value={formData.password} onChange={handleChange} />
                {formData.errors.password && (
                    <p style={{ color: "red" }}>{formData.errors.password}</p>
                )}
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}