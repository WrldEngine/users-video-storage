import React, { useEffect } from 'react';

export default function LogoutView() {
    useEffect(() => {
        localStorage.removeItem('access');
    }, []);

    return (
        <h1>Successfully logout</h1>
    )
}