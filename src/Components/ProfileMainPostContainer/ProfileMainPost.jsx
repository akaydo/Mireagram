import React, { useEffect } from "react";
import "./profilemainpost.css";
import ContentPost from "../ContentPostContainer/ContentPost";
import Post from "../ProfilePostContainer/Post";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ProfileMainPost() {
  const [post, setPost] = useState([]);
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/get/post/${id}`
        );
        setPost(res.data);
      } catch (error) {
        console.log("error occured");
      }
    };
    getPost();
  }, [id]);

  return (
    <div className="profilemain-post-container">
      <div>
        <img
          src="https://pr1.zoon.ru/dzVotkJmiGw7eVc4hNeH-Q/510x286,q85/4px-BW84_n3h7kwiTvqDUwbP6aVnSLmG4M8EDRUuwhNVautlB2hEgvDIBDodd6PebWXECVs0dj3prCGCSyrk4Ve6lgfs6nPyf_D3f8wnVqKEJBJKatUTAoW0s9AUYBsyK4BNNfp3oXkTanwOcd_ZXYoKhQDMJSr01nmHvazxnaoFtYkKWucRw6Li5Hh9RJxLfZoLLD0uVxVVzNrFOWuuH5ueHYmfOACmDlpp7VzlF8UP8cgN-KMCWqe8zpeR2imkwxIYkgs2w6NFTYky_Jtr1O9CviKO3SEF"
          className="profile-coverimage"
          alt=""
        />
        <h2
          style={{
            marginTop: -43,
            color: "white",
            textAlign: "start",
            marginLeft: "34px",
          }}
        >
          Страница пользователя
        </h2>
      </div>
      <ContentPost />
      {post.map((item) => (
        <Post detail={item} />
      ))}
    </div>
  );
}
