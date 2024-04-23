import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function VideoView() {
    const { pk } = useParams();
    const [video, setVideoData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}videos/${pk}/`);
            setVideoData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='user_detail'>
            <video width="320" height="240" controls>
                <source src={`http://127.0.0.1:8000/${video.video}`}></source>
            </video>
            <h1>{video.title}</h1>
        </div>
    );
}