import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function VideoView() {
    const { id } = useParams();
    const [video, setVideoData] = useState(null);
    const headers = localStorage.getItem('access') ? { Authorization: `Bearer ${localStorage.getItem('access')}` } : {};

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}videos/${id}/`, 
                {
                    headers: headers,
                }
            );

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
            {video && (
                <div>
                    <h1>{video.title}</h1>
                    <p>{video.date}</p>
                    <video width="320" height="240" controls>
                        <source src={`${import.meta.env.VITE_STORAGE_URL}${video.video}`}></source>
                    </video>
                </div>
            )}
        </div>
    );
}