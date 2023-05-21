import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const code = location.search.split("?")[1];
  const [password, setpassword] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/user/reset/password?${code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ password: password }),
    }).then(() => {
      alert("Ваш пароль успешно восстановлен");
    });
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "25%",
          padding: "20px",
          margin: "auto",
          borderRadius: "10px",
          backgroundColor: "black",
        }}
      >
        <p style={{ color: "white" }}>Введите новый пароль</p>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            type={"password"}
            placeholder="**********"
            style={{
              flex: 1,
              minWidth: "40px",
              margin: "10px 0px",
              padding: "10px",
              borderRadius: "10px",
            }}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            style={{
              width: "40%",
              border: "none",
              padding: "10px 20px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
              margin: "20px 0px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            Установить пароль
          </button>
        </form>
      </div>
    </div>
  );
}
