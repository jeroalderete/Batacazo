import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="navbar shadow-md w-full fixed top-0 left-0"
      style={{ fontSize: isScrolling ? 15 : null }}
    >
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <NavLink to="/">
          <div className="font-bold text-2x1 cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-3xl text-indigo-mr1 pt-2">
              <ion-icon name="bag-outline"></ion-icon>
            </span>
            <p
              className="px-5 text-2xl"
              style={{ fontSize: isScrolling ? 25 : 28 }}
            >
              JADE
            </p>
          </div>
        </NavLink>

        <ul className="md:flex md: items-center">
          <li className="md:ml-8 text-x1">
            <NavLink
              to="/category/vestidos"
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              VESTIDOS
            </NavLink>
          </li>
          <li className="md:ml-8 text-x1">
            <NavLink
              to="/category/conjuntos"
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              CONJUNTOS
            </NavLink>
          </li>
          <li className="md:ml-8 text-x1">
            <NavLink
              to="/category/sport"
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              SPORT BC
            </NavLink>
          </li>
          <li className="md:ml-8 text-x1">
            <NavLink
              to="/category/trajes-de-baño"
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              SWIMWEAR BC
            </NavLink>
          </li>
          <li className="md:ml-8 text-x1">
            <NavLink
              to="/"
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              TIENDA
            </NavLink>
          </li>
          <NavLink to="/cart">
            <button className="bg-white p-3 text-3xl button-cart cart-widget">
              <CartWidget />
            </button>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
