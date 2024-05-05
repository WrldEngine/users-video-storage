import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

export default function SelfProfileView() {
  const [user, setUserData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}users/me/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      setUserData(response.data);
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container p-3" data-bs-theme="dark">
      {user.profile && (
        <Card border="info">
          <div className="container p-4">
            <Card.Title>{user.profile.username}</Card.Title>
            <Card.Subtitle>Email {user.profile.email}</Card.Subtitle>
            <Card.Text>
              Имя {user.profile.first_name}
              <br />
              Фамилия {user.profile.last_name}
            </Card.Text>
          </div>
        </Card>
      )}

      {user.profile && !user.profile.verified && (
        <div className="pt-3" data-bs-theme="dark">
          <Alert variant="warning">Не верифицирован</Alert>
        </div>
      )}

      <div className="container mt-4">
        {user.liked_videos && user.liked_videos.length > 0 ? (
          user.liked_videos.map((video) => (
            <Card key={video.id} className="mb-3">
              <Card.Body>
                <Card.Link href={`/videos/${video.id}`}>
                  {video.title}
                </Card.Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-danger">Понравившихся видео не найденно</p>
        )}
      </div>
    </div>
  );
}
