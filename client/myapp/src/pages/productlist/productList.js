import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./productList.css";
import { getAllProducts } from "../../slices/productsSlics";

const ProductList = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
    dispatch(getAllProducts());
  // }, []);

  return <div>Product list page</div>;
};

export default ProductList;
