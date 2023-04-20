import React from "react";
import { Link } from "react-router-dom";
import "../ItemCount/ItemCount.css";

const DetailButton = ({ product }) => {
  return (
    <Link to={`/item/${product.id}`}>
      <div className="button-container pt-5">
        <button className="boton-agregar px-14"> Ver Más </button>
      </div>
    </Link>
  );
};

export default DetailButton;
