import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SelfProfileView() {
    const [user, setUserData] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}users/me/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            });
            setUserData(response.data);

        } catch (error) {
            navigate('/login');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='user_detail'>
            <h1>{user.username}</h1>
            <strong>{user.first_name}</strong>
            <strong>{user.email}</strong>
        </div>
    );
}