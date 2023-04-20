import FadeLoader from "react-spinners/FadeLoader";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="pt-10">
        <FadeLoader color="#000000" />
      </div>
    </div>
  );
};

export default Loader;
