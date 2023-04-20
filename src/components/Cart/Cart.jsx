import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import CartList from "../CartList/CartList";
import HomeButton from "../HomeButton/HomeButton";
import CheckoutButton from "../CheckoutButton/CheckoutButton";
import "./cart.css";
import "../CartItem/CartItem.css";

const Cart = () => {
  const { productsAdded, clearCart, totalItems, totalPrice } =
    useContext(CartContext);

  const location = useLocation();

  const renderButton = location.pathname === "/cart";

  return (
    <div className="cart-container">
      <div className="cart-container cart-border">
        {productsAdded.length <= 0 ? (
          <>
            <div className="cartEmpty-message">Carrito Vacio</div>
            <HomeButton />
          </>
        ) : (
          <>
            <button className="cart--empty" onClick={clearCart}>
              Vaciar Carrito
            </button>

            <CartList products={productsAdded} />
            <p className="position-absolute top-0 start-100 translate-middle badge text-black text-xl rounded-pill bg-dark">
              Total Items: {totalItems()}
            </p>
            <p className="position-absolute top-0 start-100 translate-middle badge text-black text-xl rounded-pill bg-dark">
              Total Price: ${totalPrice().toLocaleString()}
            </p>
            {renderButton && <CheckoutButton />}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
