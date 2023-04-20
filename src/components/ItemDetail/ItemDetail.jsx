import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import HomeButton from "../HomeButton/HomeButton";
import ItemCount from "../ItemCount/ItemCount";
import "../ItemListContainer/ItemListContainer.css";
import "../Item/Item.css";
import "./ItemDetail.css";

const ItemDetail = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const [added, setAdded] = useState(0);

  const onAdd = (count) => {
    setAdded(count);
    addItemToCart(product, count);
  };

  return (
    <div className="w-80 text-center p-3 pt-20">
      <div className="img_container p-8 bg-bgGray rounded-lg">
        <img className="w-25 py-10" src={product.img} alt="imagen de bata" />
      </div>
      <div className="text-center">
        <p className="producto-nombre">{product.name}</p>
        <p className="mt-1 text-slate-400">{product.desc}</p>
        <p className="producto-talle"> Talle : {product.size}</p>
        <p className="producto-talle">Stock Disponible : {product.stock}</p>
        <p className="producto-precio">${product.price.toLocaleString()}</p>

        <div>
          {added == 0 && (
            <>
              <ItemCount
                product={product}
                stock={product.stock}
                onAdd={onAdd}
              />
              <HomeButton />
            </>
          )}

          <div className="compra-container">
            {added >= 1 && (
              <>
                <ItemCount
                  product={product}
                  stock={product.stock}
                  onAdd={onAdd}
                />
                <Link to="/checkout">
                  <button className="checkout-button mt-5">
                    Ir A Checkout
                  </button>
                </Link>

                <HomeButton />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
