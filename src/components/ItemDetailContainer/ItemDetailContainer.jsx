import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loader from "../Loader/Loader";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(true);
  const params = useParams();

  let timeOutLoader;

  // FIREBASE

  useEffect(() => {
    const db = getFirestore();
    const refItem = doc(db, "items", params.id);
    getDoc(refItem)
      .then((response) => {
        if (response.exists()) {
          setProduct({ id: response.id, ...response.data() });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        timeOutLoader = setTimeout(() => {
          setLoader(false);
        }, 1000);
      });

    return () => {
      clearTimeout(timeOutLoader);
    };
    
  }, []);

  if (!product) {
    return <Loader />;
  }

  return loader ? (
    <Loader />
  ) : (
    <div className="item-detail-container">
      <ItemDetail product={product} />
    </div>
  );
};

export default ItemDetailContainer;
