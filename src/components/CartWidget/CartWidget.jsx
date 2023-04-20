import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { IoCartOutline } from "react-icons/io5";

const CartWidget = () => {
  const { productsCounter } = useContext(CartContext);

  return (
    <div className="md: flex  container--cartWidget">
      <IoCartOutline className="cart--icon mr-2" />
      <div className="cart--quantity text-xl">{productsCounter}</div>
    </div>
  );
};

export default CartWidget;
