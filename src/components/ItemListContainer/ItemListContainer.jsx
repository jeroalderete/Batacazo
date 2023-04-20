import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader";
import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "./ItemListContainer.css";

const ItemListContainer = ({ subtitle, categoryId, CategoryRoute }) => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  let timeOutLoader;

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "items");

    if (CategoryRoute) {
      const queryResult = query(
        itemsCollection,
        where("category", "==", categoryId)
      );
      getDocs(queryResult)
        .then((response) => {
          const productosDb = response.docs;
          setProducts(
            productosDb.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        })
        .catch((error) => console.log({ error }));
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    } else {
      getDocs(itemsCollection)
        .then((response) => {
          const productosDb = response.docs;
          setProducts(
            productosDb.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        })
        .catch((error) => console.log({ error }))
        .finally(() => {
          timeOutLoader = setTimeout(() => {
            setLoader(false);
          }, 500);
        });

      return () => {
        clearTimeout(timeOutLoader);
      };
    }
  }, [categoryId]);

  return loader ? (
    <Loader />
  ) : (
    <div className="grid">
      <h1 className="title">JADE</h1>
      <div className="subtitle">{subtitle}</div>
      <div>
        <ItemList products={products} />
      </div>
      <div className="boton-container"></div>
    </div>
  );
};

export default ItemListContainer;
