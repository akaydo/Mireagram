import React from "react";
import Contact from "../../Components/Contact/Contact";
import Navbar from "../../Components/Navbar/Navbar";

export default function Chat() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Contact />
      </div>
    </div>
  );
}
