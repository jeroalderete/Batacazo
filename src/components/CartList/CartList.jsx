import { CartItem } from "../CartItem/CartItem";

const CartList = ({ products }) => {
  return products.map((product) => (
    <CartItem id={product.id} key={product.id} product={product} />
  ));
};

export default CartList;
