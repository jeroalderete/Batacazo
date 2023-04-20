import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const MySwal = withReactContent(Swal);
  const [productsAdded, setProductsAdded] = useState(() => {
    const productosInLocal = localStorage.getItem("productsAdded");
    return productosInLocal ? JSON.parse(productosInLocal) : [];
  });

  useEffect(() => {
    localStorage.setItem("productsAdded", JSON.stringify(productsAdded));
  }, [productsAdded]);

  const addItemToCart = (product, quantity) => {
    const isAlreadyInCart = existInCart(product);
    if (isAlreadyInCart) {
      const productToModify = productsAdded.find(
        (productsAdded) => productsAdded.id === product.id
      );

      const productModified = {
        ...productToModify,
        quantity: productToModify.quantity + quantity,
      };

      setProductsAdded((prevState) =>
        prevState.map((productsAdded) =>
          productsAdded.id === product.id ? productModified : productsAdded
        )
      );
    } else if (product.stock === 0) {
      MySwal.fire({
        title: <p className="itemCount-error">Producto Sin Stock</p>,
      });
    } else if (product.stock >= 1) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Producto Agregado Al Carrito",
      });
      product.quantity = quantity;
      setProductsAdded([...productsAdded, product]);
    }
  };

  const clearCart = () => {
    setProductsAdded([]);
  };

  const clearCartAfterBuying = () => {
    setProductsAdded([]);
  };

  const removeItem = (itemId) => {
    const removeProduct = productsAdded.filter(
      (productsAdded) => productsAdded.id !== itemId.id
    );
    setProductsAdded([...removeProduct]);
  };

  const totalItems = () => {
    return productsAdded.reduce(
      (accum, product) => (accum += product.quantity),
      0
    );
  };

  let productsCounter = productsAdded.reduce(
    (acumulador, product) => acumulador + product.quantity,
    0
  );

  const existInCart = (product) => {
    return productsAdded.some(
      (productsAdded) => productsAdded.id === product.id
    );
  };

  const totalPrice = () => {
    const totalPriceProducts = productsAdded.reduce(
      (accum, product) => (accum += product.quantity * product.price),
      0
    );
    return totalPriceProducts;
  };

  return (
    <CartContext.Provider
      value={{
        productsAdded,
        addItemToCart,
        clearCart,
        removeItem,
        totalItems,
        totalPrice,
        productsCounter,
        clearCartAfterBuying,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
