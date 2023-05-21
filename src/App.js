import "./App.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Register/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Chat from "./Pages/Chat/Chat";

function App() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user?.other?.verifed === true ? (
                <Home />
              ) : (
                <Navigate to={"/login"} replace={true} />
              )
            }
          ></Route>
          <Route path="/Profile/:id" element={<Profile />}></Route>
          <Route
            path="/login"
            element={
              user?.other?.verifed === true ? (
                <Navigate to={"/"} replace={true} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/verify/email"
            element={
              user?.Status === "Pending" ? (
                <VerifyEmail />
              ) : user?.other?.verifed === true ? (
                <Navigate to={"/"} replace={true} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route path="/forgot/password" element={<ForgotPassword />}></Route>
          <Route path="/reset/password" element={<ResetPassword />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
