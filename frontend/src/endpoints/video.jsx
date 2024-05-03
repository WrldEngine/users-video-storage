import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactPlayer from 'react-player';
import Badge from 'react-bootstrap/Badge';

import CommentsComponent from './components/comments'
import CommentForm from './components/form_comments';

export default function VideoView() {
    const { id } = useParams();
    const [video, setVideoData] = useState(null);
    const navigate = useNavigate();

    const access_token = localStorage.getItem('access');
    const headers = localStorage.getItem('access') ? { Authorization: `Bearer ${access_token}` } : {};

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

    const toggleLike = async(videoId) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}videos/${videoId}/like/`, {}, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            });

            if (response.data.liked) {
                document.getElementById(`button-like-${videoId}`).innerHTML = 'Не нравится'
            } else {
                document.getElementById(`button-like-${videoId}`).innerHTML = 'Нравится'
            }

            document.getElementById(`likes-count-${videoId}`).innerHTML = `Лайки: ${response.data.detail.likes.length}`;

        } catch (error) {
            navigate('/login')
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className='container' data-bs-theme='dark'>
                {video && (
                    <div className="row justify-content-center pt-5">
                        <div className='col-sm-7 p-3'>
                            <Card border='warning'>

                                <ReactPlayer
                                    autoPlay={true}
                                    controls={true}
                                    playing
                                    url={`${import.meta.env.VITE_STORAGE_URL}${video.detail.video}`}
                                    width={'100%'}
                                    height={'100%'}
                                />

                                <Card.Body>
                                    <Card.Title>
                                        {video.detail.title}
                                    </Card.Title>
                                    
                                    <Badge id={`likes-count-${video.detail.id}`} className="col-auto align-self-center" bg="secondary">
                                        Лайки: {video.detail.likes.length}
                                    </Badge>

                                    <Button id={`button-like-${video.detail.id}`} onClick={() => toggleLike(video.detail.id)} variant='outline-danger'>
                                        {video.liked ? "Не нравится" : "Нравится"}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
            <CommentForm video_id={id} />
            <CommentsComponent video_id={id} />
        </div>
    );
}