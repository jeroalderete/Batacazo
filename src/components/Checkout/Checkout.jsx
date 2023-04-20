import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import HomeButton from "../HomeButton/HomeButton";
import Cart from "../Cart/Cart";
import RedirectedLink from "../RedirectedLink/RedirectedLink";
import {
  collection,
  getFirestore,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Checkout.css";

const Checkout = () => {
  const { productsAdded, clearCartAfterBuying } = useContext(CartContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirection, setRedirection] = useState(false);
  const [sendOrderState, setSendOrderState] = useState(false);

  const db = getFirestore();

  const updateOrder = (productId, finalStock) => {
    const itemRef = doc(db, "items", productId);
    updateDoc(itemRef, { stock: finalStock }).catch((error) =>
      console.log({ error })
    );
  };

  const sendOrder = () => {
    const totalPrice = productsAdded.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );

    const newOrder = {
      name,
      lastName,
      email,
      phone,
      items: productsAdded,
      total: totalPrice,
    };

    const collectionRef = collection(db, "orders");

    addDoc(collectionRef, newOrder)
      .then((response) => {
        const orderId = response.id;
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          position: "center",
          icon: "success",
          title: (
            <p className="buyMessage">{`Su id de compra es ${orderId}`}</p>
          ),
          showConfirmButton: false,
          timer: 15500,
        });

        productsAdded.map((product) => {
          const finalStock = product.stock - product.quantity;
          updateOrder(product.id, finalStock);
        });
      })
      .catch((error) => console.log({ error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRedirection(true);
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      position: "center",
      icon: "success",
      title: <p className="buyMessage">Muchas Gracias Por Su Compra!</p>,
      showConfirmButton: false,
      timer: 1500,
    });
    clearCartAfterBuying();
    setSendOrderState(true);
  };

  return (
    <>
      <Cart />
      <div className="wrapper">
        <div className="payment">
          <div className="payment-logo">
            <p>B</p>
          </div>
          <h1 className="text-xl">CHECKOUT</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="card space icon-relative">
              <label className="label">Nombre</label>
              <input
                type="text"
                id="Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nombre"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="card space icon-relative">
              <label className="label">Apellido</label>
              <input
                type="text"
                id="Apellido"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Apellido"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="card space icon-relative ">
              <label className="label">Email</label>
              <input
                required
                type="email"
                id="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="confirmEmail"
              >
                Confirmar Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmEmail"
                type="email"
                placeholder="Confirmar Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </div>
            <div className="card space icon-relative">
              <label className="label">Telefono</label>
              <input
                required
                type="tel"
                id="tel"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Numero de telefono"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {sendOrderState === true ? (
              ""
            ) : (
              <div className="btn-container">
                <button
                  onClick={sendOrder}
                  disabled={
                    name.length === 0 ||
                    email.length === 0 ||
                    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) ||
                    confirmEmail.length === 0 ||
                    phone.length === 0 ||
                    isNaN(phone) ||
                    confirmEmail != email
                  }
                  type="submit"
                  className="btn-pay w-full"
                >
                  Realizar Compra
                </button>
              </div>
            )}

            {redirection ? <RedirectedLink /> : null}

            <HomeButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
