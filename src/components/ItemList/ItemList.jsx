import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ products }) => {
  return (
    <div className="item-container ">
      <ul className="items-list">
        <div className="items-list text-center md:flex justify-center flex-wrap">
          {products.map((producto) => (
            <Item key={producto.id} product={producto} />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ItemList;
