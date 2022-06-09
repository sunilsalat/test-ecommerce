import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Product from "../../components/productComponent/Product";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProducts, getCategories } from "../../slices/productsSlics";
import { getAllCartItems } from "../../slices/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const cat = query.get("cat");
  const title = query.get("title");

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, []);

  useEffect(() => {
    dispatch(getAllProducts({ cat, title }));
    dispatch(getAllCartItems())
  }, [dispatch, cat, title]);

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
            {categories.length !== 0 &&
              categories.map((e) => {
                return (
                  <p
                    onClick={() => {
                      navigate(`/?cat=${e._id}`);
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
