import React, { useEffect, useState } from "react";
import "./contact.css";
import ChatContainer from "../ChatContainer/ChatContainer";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Contact() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.other._id;
  const accesstoken = user.accessToken;
  const [users, setUsers] = useState();
  const [currentChatUser, setCurrentChatUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/following/${id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {}
    };
    getUser();
  }, [accesstoken, id]);
  const handleUser = (e) => {
    setCurrentChatUser(e);
  };
  return (
    <div className="mainContactContainer">
      <div>
        <div style={{ width: "20pc", padding: "10px" }}>
          <input
            className="searchBarForContact"
            type="search"
            placeholder="Поиск друзей"
          ></input>
        </div>

        <div className="usersDetailContainer">
          {users?.map((item) => (
            <div>
              {item?._id !== id ? (
                <div
                  className="userContainer"
                  onClick={(e) => handleUser(item)}
                >
                  <img
                    src={`${item?.profile}`}
                    className="chatUserImage"
                    alt=""
                  />
                  <div style={{ marginLeft: "10px" }}>
                    <p
                      style={{
                        color: "white",
                        textAlign: "start",
                        marginTop: "5px",
                        fontSize: "15px",
                      }}
                    >
                      {item?.username}
                    </p>
                    <p
                      style={{
                        color: "white",
                        textAlign: "start",
                        marginTop: "-16px",
                        fontSize: "14px",
                      }}
                    >
                      Начните чат!
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      {currentChatUser !== undefined ? (
        <ChatContainer currentChatUser={currentChatUser} />
      ) : (
        <div style={{ marginLeft: "40px", marginTop: "10px" }}>
          <p style={{ fontSize: "30px", color: "#402aa5" }}>
            Выберите диалог с другом
          </p>
        </div>
      )}
    </div>
  );
}
