import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
        <div className='container' data-bs-theme="dark">
            <div className="row justify-content-center">
                {videos.map((video) => (
                    <Card border='warning' className='col-sm-3'>
                        <ReactPlayer url={`${import.meta.env.VITE_STORAGE_URL}${video.video}`} width='100%' height='100%'/>
                        <Card.Body>
                            <Card.Title>{video.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Просмотры: {video.views_accounts.length}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Лайки: {video.likes.length}</Card.Subtitle>
                            <Button href={`/videos/${video.id}`} variant="primary">Смотреть</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}