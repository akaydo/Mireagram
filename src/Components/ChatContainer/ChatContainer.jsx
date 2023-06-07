import React, { useEffect, useRef, useState } from "react";
import "./Chatcontainer.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function ChatContainer(currentChatUser) {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.other._id;
  const scrollRef = useRef();
  const socket = useRef();
  const [message, setMessage] = useState();
  const accesstoken = user.accessToken;
  const [inputMessage, setInputMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `https://mireagram-api.vercel.app/api/post/get/chat/msg/${id}/${currentChatUser?.currentChatUser._id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setMessage(res.data);
      } catch (error) {}
    };
    getMessage();
  }, [accesstoken, currentChatUser?.currentChatUser._id, id]);

  useEffect(() => {
    if (currentChatUser.currentChatUser !== "") {
      socket.current = io("https://mireagram-api.vercel.app");
      socket.current.emit("addUser", id);
    }
  }, [currentChatUser.currentChatUser, id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const sendMsg = () => {
    const messages = {
      myself: true,
      message: inputMessage,
    };
    socket.current.emit("send-msg", {
      to: currentChatUser.currentChatUser._id,
      from: id,
      message: inputMessage,
    });
    fetch(`https://mireagram-api.vercel.app/api/post/msg`, {
      method: "POST",
      headers: { "Content-Type": "application/JSON", token: accesstoken },
      body: JSON.stringify({
        from: id,
        to: currentChatUser.currentChatUser._id,
        message: inputMessage,
      }),
    });
    setMessage(message.concat(messages));
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ myself: false, message: msg });
      });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage && setMessage((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);
  return (
    <div className="mainChatContainer">
      <div>
        <div
          style={{
            display: "flex",
            marginLeft: "30px",
            marginTop: "10px",
            backgroundColor: "rgb(241 243 241)",
            width: "70pc",
            padding: "5px",
            borderRadius: "10px",
          }}
        >
          <img
            src={`${currentChatUser.currentChatUser?.profile}`}
            className="userProfile"
            alt="Аватар"
          />
          <p style={{ marginTop: "10px", marginLeft: "10px" }}>
            {currentChatUser.currentChatUser?.username}
          </p>
        </div>
        <div className="msgContainer">
          {message?.map((item) => (
            <div ref={scrollRef}>
              {item?.myself === false ? (
                <div className="msg">
                  <img
                    src={`${currentChatUser?.currentChatUser.profile}`}
                    className="chatUserProfile"
                  />
                  <p className="msg-txt">{item?.message}</p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "30px",
                    backgroundColor: "rgb(241 243 241)",
                    marginTop: "10px",
                    padding: "3px",
                    borderRadius: "10px",
                    width: "40%",
                    marginTop: "10px",
                    marginLeft: "650px",
                  }}
                >
                  <p style={{ textAlign: "start", marginLeft: "10px" }}>
                    {item?.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="msgSenderContainer">
          <input
            type="text"
            placeholder="Напишите сообщение..."
            onChange={(e) => setInputMessage(e.target.value)}
            name=""
            id=""
            className="msg-input"
          />
          <button className="msgButton" onClick={sendMsg}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
