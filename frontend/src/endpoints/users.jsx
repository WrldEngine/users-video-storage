import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import axios from 'axios';

const current_endpoint = `${import.meta.env.VITE_API_URL}users/`

export default function UsersView() {
    const [users, setUsersdata] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(current_endpoint);
            setUsersdata(response.data);

        } catch (error) {
            console.error("net errors");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='users_table'>
            {users.map((user) => (
                <div className='user' key={user.id}>
                    <div>
                        <li>
                            <Link to={`${user.id}/`}>link</Link>
                        </li>
                    </div>
                    <b>{user.username}</b>
                    <b>{user.first_name}</b>
                    <b>{user.last_name}</b>
                </div>
            ))}
        </div>
    );
}