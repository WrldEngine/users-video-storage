import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import CommentForm from "./form_comments";

export default function CommentsComponent({ video_id }) {
  const current_endpoint = `${
    import.meta.env.VITE_API_URL
  }videos/${video_id}/comment/`;
  const [comments, setCommentsData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(current_endpoint);
    setCommentsData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [video_id]);

  if (comments.length === 0) {
    return (
      <div>
        <CommentForm video_id={video_id} updateComments={fetchData} />
        <div className="container pt-4" data-bs-theme="dark">
          <Card border="warning">
            <Card.Body>
              <Card.Title>Здесь пока нет комментариев</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CommentForm video_id={video_id} updateComments={fetchData} />
      <div className="container pt-4" data-bs-theme="dark">
        {comments.map((comment) => (
          <div key={comment.id} className="col-sm pt-3">
            <Card border="warning">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Link href={`/users/${comment.author.id}`}>
                      {comment.author.username}
                    </Card.Link>
                  </div>
                  <div className="text-end" style={{ width: "50%" }}>
                    <Card.Subtitle xs="auto">{comment.date}</Card.Subtitle>
                  </div>
                </div>
                <Card.Text>{comment.content}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
