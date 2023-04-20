import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import { useParams } from "react-router-dom";
import "./App.css";

function Root() {
  const params = useParams();
  const CategoryRoute = Boolean(params.id);

  return (
    <div className="App">
      <ItemListContainer
        subtitle="Fashion Design & Home Wear"
        CategoryRoute={CategoryRoute}
        categoryId={params.id}
      />
    </div>
  );
}

export default Root;
