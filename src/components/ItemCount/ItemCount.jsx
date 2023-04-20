import { useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import "./ItemCount";
import "./ItemCount.css";
import "../ItemListContainer/ItemListContainer.css";

function ItemCount({ product, stock, onAdd }) {
  const { addItemToCart } = useContext(CartContext);
  const [count, setCount] = useState(1);
  const [emptyStock, setEmptyStock] = useState(false);

  const handleClick = (value) => {
    if (count + value > 0 && count + value <= product.stock) {
      setCount(count + value);
      setEmptyStock(false);
    } else {
      count + value >= product.stock && setEmptyStock(true);
    }
  };

  const increaseCounter = () => {
    setCount((count) => count + 1);
  };

  const decreaseCounter = () => {
    setCount((count) => count - 1);
  };

  const handleButtonClick = () => {
    handleClick();
    setCount(1);
  };

  return (
    <div>
      <div className="button-container">
        <button
          disabled={count == 1}
          onClick={() => handleClick(-1, decreaseCounter)}
        >
          -
        </button>

        <p className="pt-2.5">{count}</p>

        <button
          disabled={count === stock}
          onClick={() => handleClick(1, increaseCounter)}
        >
          +
        </button>
      </div>

      <div className="md: flex justify-center">
        <button
          className="boton-agregar mt-5"
          onClick={() =>
            onAdd(count, addItemToCart(product, count), handleButtonClick())
          }
        >
          Agregar Al Carrito
        </button>
      </div>

      {emptyStock && <div className="itemCount-error">Stock Agotado</div>}
    </div>
  );
}

export default ItemCount;
