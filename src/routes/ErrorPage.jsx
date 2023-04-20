import { Link, useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar/Index";
import Footer from "../components/Footer";
import "./App.css";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <main className="text-center p-5">
      <Navbar />
      <div className="error-container">
        <h1>
          <strong>OOPS!</strong>
        </h1>
        <h2 className="text-3xl">Disculpas, ha surgido un error inesperado </h2>
        <p>
          <i>{error.message}</i>
        </p>
        <div className="pt-20">
          <Link to="/">
            <button className="bg-black text-white">Volver a Inicio</button>
          </Link>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </main>
  );
};

export default ErrorPage;
