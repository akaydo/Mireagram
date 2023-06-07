import React, { useEffect, useState } from "react";
import "./leftbar.css";
import image from "../Images/Profile.png";
import image1 from "../Images/image1.jpg";
import image2 from "../Images/image2.jpg";
import image3 from "../Images/image3.jpg";
import image4 from "../Images/image4.jpg";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Leftbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user?.other?._id;
  const accesstoken = user.accessToken;
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `https://mireagram-api.vercel.app/api/user/flw/${id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setPost(res.data);
      } catch (error) {}
    };
    getPost();
  }, [accesstoken, id]);

  return (
    <div className="left-bar">
      <div className="notifications-container">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p style={{ marginLeft: "-14px" }}>Уведомления</p>
          <p style={{ color: "#aaa", marginLeft: "40px" }}>Все</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -10 }}>
          <img src={`${image}`} className="notification-img" alt="" />
          <p
            style={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: 13,
              width: "120px",
              textAlign: "start",
            }}
          >
            Madan поставил лайк на вашу запись
          </p>
          <img src={`${image1}`} className="like-image" alt="" />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -10 }}>
          <img src={`${image2}`} className="notification-img" alt="" />
          <p
            style={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: 13,
              width: "120px",
              textAlign: "start",
            }}
          >
            Nanu поставил лайк на вашу запись
          </p>
          <img src={`${image3}`} className="like-image" alt="" />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -10 }}>
          <img src={`${image}`} className="notification-img" alt="" />
          <p
            style={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: 13,
              width: "120px",
              textAlign: "start",
            }}
          >
            Madan подписался на вас
          </p>
          <img src={`${image4}`} className="following-user-image" alt="" />
        </div>
      </div>

      <div className="notifications-container">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p style={{ marginLeft: "-20px" }}>Фотографии</p>
          <p style={{ color: "#aaa", marginLeft: "40px" }}>Все</p>
        </div>
        <div>
          {post.map((item) => [
            item.image === "" ? (
              ""
            ) : (
              <img src={`${item.image}`} className="explore-image" alt="" />
            ),
          ])}
        </div>
      </div>
    </div>
  );
}
