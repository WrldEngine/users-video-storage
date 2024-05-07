import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProfileView() {
  const { pk } = useParams();
  const [user, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}users/${pk}/`,
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Auth error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="user_detail">
      <h1>{user.username}</h1>
    </div>
  );
}
