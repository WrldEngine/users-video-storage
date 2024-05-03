import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CommentForm({ video_id }) {
    const current_endpoint = `${import.meta.env.VITE_API_URL}videos/${video_id}/comment/`
    const current_page = `${window.location.protocol}//${window.location.host}/video/${video_id}`;

    console.log(current_page);

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
            errors.content = "Имя пользователя не указано";
        }

        setFormData((prevState) => ({ ...prevState, errors }));

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async(event) => {
        const errors = {};

        if (validateForm()) {
            try {
                const response = await axios.post(current_endpoint, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    }
                });

            } catch(error) {
                errors.auth = "Вы не авторизованы"
                setFormData((prevState) => ({ ...prevState, errors }));
            }
        }

        event.preventDefault();
    };

    return (
        <div className="container" data-bs-theme="dark">
            <h2 className='text-warning mb-4'>Comment</h2>

            <Form action={current_page} onSubmit={handleSubmit} method='POST'>
                {formData.errors.auth && (
                    <p className="text-danger" style={{ color: 'red' }}>{formData.errors.auth}</p>
                )}
                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formContent">
                        <Form.Control className="form-control-dark" type="text" name="content" value={formData.content} onChange={handleChange} />
                        {formData.errors.content && (
                            <p className="text-danger">{formData.errors.content}</p>
                        )}
                    </Form.Group>
                
                </Row>
                <Button variant="warning" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}