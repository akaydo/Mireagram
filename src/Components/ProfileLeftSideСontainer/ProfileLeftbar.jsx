import React, { useEffect } from "react";
import "./profileleftbar.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function ProfileLeftbar() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const [Follow, setUnFollow] = useState([
    user.other.Following.includes(id) ? "Unfollow" : "Follow",
  ]);
  const accessToken = user.accessToken;
  // let username = user?.other?.username;

  const [users, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/post/user/details/${id}`
        );
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, [id]);
  let followersCounter = users?.Followers?.length;
  let followingCounter = users?.Following?.length;

  const [Followinguser, setFollowinguser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/following/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error");
      }
    };
    getFollowing();
  }, [id]);

  const handleFollow = async () => {
    if (Follow === "Follow") {
      await fetch(`http://localhost:5000/api/user/following/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON", token: accessToken },
        body: JSON.stringify({ user: `${user.other._id}` }),
      });
      setUnFollow("UnFollow");
    } else {
      await fetch(`http://localhost:5000/api/user/following/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON", token: accessToken },
        body: JSON.stringify({ user: `${user.other._id}` }),
      });
      setUnFollow("Follow");
    }
  };

  console.log(Followinguser);

  return (
    <div className="profile-leftbar">
      <div className="notifications-container">
        <img
          src="https://sun6-20.userapi.com/impf/xerZUb9w3jiluGkDA0e6Ke9q5dJ4Vn571NmcQQ/o3W1Bb74ELA.jpg?size=1818x606&quality=95&crop=194,0,1200,400&sign=4c9e6c151ef32688672007a6ccda92a3&type=cover_group"
          className="profile-page-cover"
          alt=""
        />
        <div style={{ display: "flex", alignItems: "center", marginTop: -30 }}>
          <img src={`${users.profile}`} className="profile-page-image" alt="" />
          <div>
            <p
              style={{
                marginLeft: 6,
                marginTop: 20,
                color: "black",
                textAlign: "start",
              }}
            >
              {users.username}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
            Подписки
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 17,
            }}
          >
            {followingCounter}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -20,
          }}
        >
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
            Подписчики
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 17,
            }}
          >
            {followersCounter}
          </p>
        </div>
        <div style={{ marginTop: -20 }}>
          <h5
            style={{
              color: "black",
              marginLeft: 10,
              fontSize: "14px",
              marginRight: 30,
              marginTop: 30,
              textAlign: "start",
            }}
          >
            Описание профиля
          </h5>
          <p
            style={{
              color: "black",
              fontSize: "12px",
              marginTop: -20,
              textAlign: "start",
              marginLeft: "10px",
            }}
          >
            Всем привет!
          </p>
        </div>
        {user.other._id !== id ? (
          <div onClick={handleFollow}>
            <button
              style={{
                width: "100%",
                paddingTop: 7,
                paddingBottom: 7,
                border: "none",
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
              }}
            >
              Подписаться
            </button>
          </div>
        ) : (
          <div>
            <button
              style={{
                width: "100%",
                paddingTop: 7,
                paddingBottom: 7,
                border: "none",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Редактировать профиль
            </button>
          </div>
        )}
      </div>

      <div className="notifications-container">
        <h3>Подписки</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ marginLeft: 10 }}>Друзья</p>
          <p style={{ marginRight: 10, color: "#aaa" }}>Все</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: 5 }}>
          {Followinguser.map((item) => (
            <Link to={`/Profile/${item._id}`}>
              <div style={{ marginLeft: 4, cursor: "pointer" }} key={item._id}>
                <img src={`${item.profile}`} className="friend-image" alt="" />
                <p style={{ marginTop: -2 }}>{item.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
