import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Product from "../../components/productComponent/Product";
import {
  getAllProducts,
  getCategoryWiseProduct,
} from "../../slices/productsSlics";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [cat1, setCat] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts({ cat: "all" }));
  }, []);

  //  util function to load categories
  useEffect(() => {
    const getAllCat = async () => {
      const res = await fetch("/api/v1/product/cat-all");
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        setCat(data);
      }
    };

    getAllCat();
  }, []);

  if (products.length <= 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <div className="side-container">
        <div className="title-container">
          <h4 className="title">Filter</h4>
        </div>
        <div className="category-container">
          <div className="category">
            <h5>Category</h5>
          </div>
          <div className="category-list">
            {cat1.length !== 0 &&
              cat1.categories.map((e) => {
                return (
                  <p
                    onClick={() => {
                      dispatch(getAllProducts({ cat: e._id }));
                    }}
                    key={e._id}
                  >
                    {e.title}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="price-filter-container"></div>
      </div>

      <div className="productList-container">
        {products &&
          products.products.map((product) => {
            return <Product product={product} key={product._id} />;
          })}
      </div>
    </div>
  );
};

export default ProductList;
