import "./allProduct.css";
import { useState } from "react";
import AddProduct from "../../components/admin-createProduct/createProduct";

const AllProduct = () => {
  const [showComponent, toggleComponent] = useState(false);

  // get all the products of seller

  return (
    <div>
      {showComponent ? (
        <AddProduct toggleComponent={toggleComponent} />
      ) : (
        <div className="product-list-container">
          <div className="btn-contianer">
            <button
              onClick={() => {
                toggleComponent(!showComponent);
              }}
            >
              Add Product
            </button>
          </div>
          <div>{}</div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
