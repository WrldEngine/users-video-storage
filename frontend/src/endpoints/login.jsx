import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const current_endpoint = `${import.meta.env.VITE_API_URL}login/`

export default function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        errors: {},
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.username) {
            errors.username = "Имя пользователя не указано";
        }

        if (!formData.password) {
            errors.password = "Пароль пользователя не указан";
        }

        setFormData((prevState) => ({ ...prevState, errors }));

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async(event) => {
        const errors = {};
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post(current_endpoint, formData);
                localStorage.setItem('access', response.data.access);

                navigate('/');

            } catch(error) {
                errors.auth = "Неверное имя пользователя или пароль"
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