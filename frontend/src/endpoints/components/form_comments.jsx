import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

export default function CommentForm({ video_id, updateComments }) {
  const current_endpoint = `${
    import.meta.env.VITE_API_URL
  }videos/${video_id}/comment/`;

  const [formData, setFormData] = useState({
    content: "",
    errors: {},
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.content) {
      errors.content = "Напишите комментарий";
    }

    setFormData((prevState) => ({ ...prevState, errors }));

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    const errors = {};
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(current_endpoint, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });

        setFormData({ content: "", errors: {} });
      } catch (error) {
        errors.auth = "Вам нужно войти";
        setFormData((prevState) => ({ ...prevState, errors }));
      }
    }

    updateComments();
  };

  return (
    <div className="container" data-bs-theme="dark">
      <h2 className="text-warning mb-4">Комментарии</h2>
      <Form onSubmit={handleSubmit} method="POST">
        {formData.errors.auth && (
          <p className="text-danger" style={{ color: "red" }}>
            {formData.errors.auth}
          </p>
        )}
        <Row>
          <Form.Group controlId="formContent" className="mb-3">
            <Form.Control
              className="form-control-dark"
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
            {formData.errors.content && (
              <p className="text-danger">{formData.errors.content}</p>
            )}
          </Form.Group>
        </Row>
        <div>
          <Button variant="warning" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
