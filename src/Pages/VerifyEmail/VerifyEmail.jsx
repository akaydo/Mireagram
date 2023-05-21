import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VerifyEmail } from "../../Components/ReduxContainer/apiCall";

export default function Verifyemail() {
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState("");
  const user = useSelector((state) => state.user);
  const userDetails = user.user;
  const id = userDetails?.user;

  const handleOTP = (e) => {
    e.preventDefault();
    VerifyEmail(dispatch, { OTP: OTP, user: id });
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
        <p>Aavelance Send Email</p>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            type={"number"}
            placeholder="Введите код"
            style={{
              flex: 1,
              minWidth: "40px",
              margin: "10px 0px",
              padding: "10px",
              borderRadius: "10px",
            }}
            onChange={(e) => setOTP(e.target.value)}
          />
          <button
            style={{
              width: "40%",
              border: "none",
              padding: "10px 5px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
              margin: "10px 0px",
              cursor: "pointer",
            }}
            onClick={handleOTP}
          >
            Подтвердить
          </button>
          <Link to={"/register"}>
            <p
              style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
                marginRight: "190px",
                fontSize: "14px",
              }}
            >
              Проверьте указанную Вами почту
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
