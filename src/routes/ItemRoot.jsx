import { useParams } from "react-router-dom";
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer";
import "./App.css";

const ItemRoot = () => {
  const params = useParams();

  return (
    <div className="App">
      <ItemDetailContainer itemId={params.id} />
    </div>
  );
};

export default ItemRoot;
