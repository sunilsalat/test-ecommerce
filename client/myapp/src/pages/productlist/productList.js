import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Product from "../../components/productComponent/Product";
import Pagination from "../../components/pagination/Pagination";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  emptyProducts,
  getAllProducts,
  getCategories,
} from "../../slices/productsSlics";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, categories, lastPage, currentPage } = useSelector(
    (state) => state.products
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const cat = query.has("cat") ? query.get("cat") : "";
  const title = query.has("title") ? query.get("title") : "";
  const page = query.has("page") ? query.get("page") : "";

  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }
  }, []);

  // only on first render
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts({}));
    }
  }, []);

  useEffect(() => {
    if (cat || title || page > 1) {
      dispatch(getAllProducts({ cat, title, page }));
    }
  }, [cat, title, page]);

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
                      dispatch(emptyProducts());
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
      <div className="main-hero-container">
        <div className="productList-container">
          {products.length !== 0 &&
            products.map((product,  ) => {
              return (
                <Product
                  product={product}
                  key={product._id}
                  index={index}
                  len={products.length}
                  lastPage={lastPage}
                  currentPage={currentPage}
                />
              );
            })}
        </div>

        {/* pagination -- improve to infinite scrolling  */}
        {/* <div className="pagination-container-main">
          <Pagination lastPage={lastPage} path={"/"} />
        </div> */}
      </div>
    </div>
  );
};

export default ProductList;
