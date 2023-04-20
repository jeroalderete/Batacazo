import { Link } from "react-router-dom";

const CheckoutButton = () => {
  return (
    <div>
      <Link to="/checkout">
        <button className="bg-black text-white">Checkout</button>
      </Link>
    </div>
  );
};

export default CheckoutButton;
