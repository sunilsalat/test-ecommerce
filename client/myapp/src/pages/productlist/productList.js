import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../slices/productsSlics";
import Product from "../../components/productComponent/Product";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, success } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length == 0) {
      dispatch(getAllProducts());
    }
  }, []);

  if (products.length <= 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <div className="side-container">
        <div>
          <p>category 1</p>
          <p>category 2</p>
        </div>
      </div>

      <div className="productList-container">
        {products &&
          products.products.map((product) => {
            return <Product product={product} key={product._id}/>;
          })}
      </div>

    </div>
  );
};

export default ProductList;
