import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./login.css";
import { useState } from "react";
import { login } from "../../Components/ReduxContainer/apiCall";

export default function Login() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <div className="mainContainerForsignup">
      <div className="submainContainer">
        <div style={{ flex: 1, marginLeft: 150, marginBottom: "170px" }}>
          <p className="logoText">
            MIREA<span className="part">GRAM</span>
          </p>
          <p className="introtext">
            Поддерживайте связь{" "}
            <span className="part">со своими одногруппниками</span>
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <p className="createaccountTxt">Вход в акканут</p>
          <input
            type="email"
            name=""
            id="email"
            placeholder="Email"
            onChange={(e) => setemail(e.target.value)}
            className="inputText"
          />
          <input
            type="password"
            placeholder="******"
            name=""
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="inputText"
          />
          <button className="btnforsignup" onClick={handleClick}>
            Войти
          </button>
          <Link to={"/forgot/password"}>
            <p style={{ textAlign: "start", marginLeft: "30.6%" }}>
              Забыли пароль?
            </p>
          </Link>
          <Link to={"/signup"}>
            <p style={{ textAlign: "start", marginLeft: "30.6%" }}>
              Нет аккаунта?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
