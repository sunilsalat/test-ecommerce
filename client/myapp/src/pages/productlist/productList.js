import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Product from "../../components/productComponent/Product";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAllProducts, getCategories } from "../../slices/productsSlics";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const cat = query.has("cat") ? query.get("cat") : "";
  const title = query.has("title") ? query.get("title") : "";

  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }
  }, []);

  useEffect(() => {
    dispatch(getAllProducts({ cat, title }));
  }, [dispatch, cat, title]);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <div className="side-container">
        <div className="title-container">
          <h4 className="title">Filter</h4>
        </div>

        {/* category */}
        <div className="category-container">
          <div className="category">
            <p>Category</p>
          </div>
          <div className="category-list">
            {categories &&
              categories.map((e) => {
                return (
                  <p
                    onClick={() => {
                      // navigate(`/?cat=${e._id}`);
                      setSearchParams({ cat: e._id });
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

      {/* products body */}
      <div className="productList-container">
        {products &&
          products.map((product) => {
            return <Product product={product} key={product._id} />;
          })}
      </div>

      {/* pagination */}
      <div>{}</div>
    </div>
  );
};

export default ProductList;
