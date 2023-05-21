import React, { useEffect } from "react";
import "./rightbar.css";
import axios from "axios";
import { useState } from "react";
import Follow from "./Follow";
import { useSelector } from "react-redux";

export default function Rightbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  const id = user?.other?._id;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/all/user/${id}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, [id]);
  return (
    <div className="right-bar">
      <div className="right-container">
        <div className="ads-container">
          <img
            src="https://www.mirea.ru/upload/resize_cache/iblock/3d0/piacxmsbf81y1aq0xdpe24wlvpiqun7b/960_538_2/ITKHT-1.jpg"
            className="ads-img"
            alt=""
          />
          <div>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                marginTop: "-5px",
              }}
            >
              05.05.23
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              Студент РТУ МИРЭА занял первое место на конференции...
            </p>
          </div>
        </div>
        <div className="ads-container">
          <img
            src="https://www.mirea.ru/upload/resize_cache/iblock/7a4/hjihog5fr60cse6g9wmt8ifi657ruw8a/960_538_2/Torzhestvennye-linei_ki-v-chest-Dnya-Pobedy1.jpg"
            className="ads-img"
            alt=""
          />
          <div>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                marginTop: "-5px",
              }}
            >
              10.05.23
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              В РТУ МИРЭА прошли торжественные линейки в честь Дня Победы
            </p>
          </div>
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
