import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div className="row">
          <div className="col text-center">
            <div className="footer_logo batacazo">
              <Link to="/">JADE</Link>
            </div>
            <br />
            <nav className="footer_nav">
              <ul>
                <li>
                  <Link to="/">Tienda</Link>
                </li>
                <li>
                  <Link
                    to="https://www.instagram.com/jade_fashion_collection/"
                    target="_blank"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link to="mailto:jadeshop@gmail.com">Contacto</Link>
                </li>
              </ul>
            </nav>

            <div className="copyright ">
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script>
              All rights reserved by{" "}
              <a
                href="https://www.instagram.com/jade_fashion_collection/"
                target="_blank "
              >
                Desarrollo Liebre Design
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
