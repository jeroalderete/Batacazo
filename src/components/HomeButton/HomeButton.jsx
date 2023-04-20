import React from "react";
import { Link } from "react-router-dom";
import "../ItemCount/ItemCount.css";

const HomeButton = () => {
  return (
    <Link to="/">
      <div className="button-container pt-5">
        <button className="boton-agregar px-16"> Home </button>
      </div>
    </Link>
  );
};

export default HomeButton;
