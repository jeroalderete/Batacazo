import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import DetailButton from "../DetailButton/DetailButton";
import { CartContext } from "../../Context/CartContext";
import "./Item.css";

const Item = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const [added, setAdded] = useState(0);

  const onAdd = (count) => {
    setAdded(count);
    addItemToCart(product, count);
  };

  return (
    <div className="w-80 text-center p-3">
      <div className="img-section1 img-section2 img-section3 img-section4 img-section5 img-section6 img-section7">
        <div className="img_container p-8 bg-bgGray rounded-lg">
          <Link to={`/item/${product.id}`}>
            <img className="w-25" src={product.img} alt="imagen de bata" />
          </Link>
        </div>
        <div className="text-center">
          <h2 className="producto-nombre">{product.name}</h2>
          <p className="mt-1 text-slate-400">{product.desc}</p>
          <p className="producto-talle">Talle : {product.size}</p>
          <p className="producto-precio"> ${product.price.toLocaleString()} </p>
          <ItemCount
            stock={Math.abs(product.stock)}
            product={product}
            onAdd={onAdd}
          />

          <DetailButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default Item;
