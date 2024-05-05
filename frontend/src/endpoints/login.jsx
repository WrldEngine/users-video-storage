import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const current_endpoint = `${import.meta.env.VITE_API_URL}login/`;

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

  const handleSubmit = async (event) => {
    const errors = {};
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(current_endpoint, formData);
        localStorage.setItem("access", response.data.access);

        window.location.replace("/profile")

      } catch (error) {
        errors.auth = error.response.data.detail;
        setFormData((prevState) => ({ ...prevState, errors }));
      }
    }

  };

  return (
    <div className="container col-sm-3" data-bs-theme="dark">
      <h1 className="text-warning text-center mb-4">Вход</h1>

      <Form onSubmit={handleSubmit}>
        {formData.errors.auth && (
          <p className="text-danger" style={{ color: "red" }}>
            {formData.errors.auth}
          </p>
        )}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formUsername">
            <Form.Label className="text-info">Username</Form.Label>
            <Form.Control
              className="form-control-dark"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {formData.errors.username && (
              <p className="text-danger">{formData.errors.username}</p>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPassword">
            <Form.Label className="text-info">Password</Form.Label>
            <Form.Control
              className="form-control-dark"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formData.errors.password && (
              <p className="text-danger">{formData.errors.password}</p>
            )}
          </Form.Group>
        </Row>
        <div className="text-center">
          <Button variant="warning" type="submit">
            Подтвердить
          </Button>
        </div>
        <div className="text-center">
          <Form.Label className="text-white">
            Нет аккаунта? Так <a href="/signup">создай</a>
          </Form.Label>
        </div>
      </Form>
    </div>
  );
}
