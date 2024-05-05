import React, { useState, useEffect } from "react";
import axios from "axios";

import ReactPlayer from "react-player";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

const current_endpoint = `${import.meta.env.VITE_API_URL}videos/`;

export default function HomeView() {
  const [videos, setVideoData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(current_endpoint);
    setVideoData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (videos.length === 0) {
    return (
      <div className="container pt-4" data-bs-theme="dark">
        <Alert variant="info">Здесь пока нет видео</Alert>
      </div>
    );
  }

  return (
    <div className="container pt-4" data-bs-theme="dark">
      <div className="row justify-content-center">
        {videos.map((video) => (
          <div key={video.id} className="col-sm-4 p-2">
            <Card border="warning">
              <ReactPlayer
                id="current_video"
                url={`${import.meta.env.VITE_STORAGE_URL}${video.video}`}
                width="100%"
                height="100%"
              />

              <Card.Body>
                <Card.Title>
                  {video.title} <Badge bg="success">популярное</Badge>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Просмотры: {video.views_accounts.length}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Лайки: {video.likes.length}
                </Card.Subtitle>
                <Button href={`/videos/${video.id}`} variant="primary">
                  Смотреть
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
