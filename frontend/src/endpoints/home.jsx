import React, { useState, useEffect } from 'react';
import axios from 'axios';

const current_endpoint = `${import.meta.env.VITE_API_URL}videos/`

export default function HomeView() {
    const [videos, setVideoData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(current_endpoint);
            setVideoData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='videos'>
            {videos.map((video) => (
                <video width="320" height="240" controls>
                    <source src={`http://127.0.0.1:8000/${video.video}`}></source>
                </video>
            ))}
        </div>
    );
}