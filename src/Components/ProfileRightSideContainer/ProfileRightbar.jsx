import React, { useEffect, useState } from "react";
import "./profilerightbar.css";
import axios from "axios";
import Follow from "../RightSideContainer/Follow";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function ProfileRightbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  let idforSuggest = user?.other?._id;
  const [Followinguser, setFollowinguser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `https://mireagram-api.vercel.app/api/post/followers/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error");
      }
    };
    getFollowing();
  }, [id]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `https://mireagram-api.vercel.app/api/user/all/user/${idforSuggest}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, [idforSuggest]);

  return (
    <div className="profile-right-bar">
      <div className="profile-right-container">
        <h3>Подписчики</h3>
        <div>
          {Followinguser.map((item) => (
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 10,
                  cursor: "pointer",
                }}
              >
                <img src={`${item.profile}`} className="friends-image" alt="" />
                <p style={{ textAlign: "start", marginLeft: "10px" }}>
                  {item.username}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right-container2">
        <h3 style={{ textAlign: "start", marginLeft: "10px" }}>
          Рекомендовано для Вас
        </h3>
        {users.map((item) => (
          <Follow userdetails={item} />
        ))}
      </div>
    </div>
  );
}
