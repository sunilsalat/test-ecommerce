import "./Product.css";
import { FaHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useRef } from "react";
import { getAllProducts } from "../../slices/productsSlics";
import { useDispatch } from "react-redux";
import { BsStarFill, BsStar } from "react-icons/bs";
import { usePaginator } from "../../customHooks/paginatior";

const Product = ({ product, index, lastPage, currentPage }) => {
  const { _id, title, price, image, countOfReviews } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const elemRef = useRef();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const cat = query.has("cat") ? query.get("cat") : "";
  const search_title = query.has("title") ? query.get("title") : "";

  /*   const runFun = () => {
    dispatch(
      getAllProducts({
        page: currentPage + 1,
        cat: cat,
        title: search_title,
      })
    );
  };
  const { observer } = usePaginator(currentPage, lastPage, runFun); */

  const observer = useCallback((node) => {
    if (elemRef.current) elemRef.current.disconnect();
    elemRef.current = new IntersectionObserver((entries) => {
      if (currentPage < lastPage && entries[0].isIntersecting) {
        dispatch(
          getAllProducts({
            page: currentPage + 1,
            cat: cat,
            title: search_title,
          })
        );
        elemRef.current.unobserve(node);
      }
    });
    // Unobserve the product once it touches the screen or callback fires off
    if (node) elemRef.current.observe(node);
  });

  const t = (id) => {
    navigate(`/product-detail/${id}`);
  };

  console.log("renderi proucte page ");

  return (
    <div
      className="main-card-container"
      ref={index + 1 === 5 * currentPage ? observer : null}
    >
      <div className="product-card-container">
        <FaHeart className="heart" />
        <div className="product-img-container" onClick={() => t(_id)}>
          <img src={Array.isArray(image) ? image[0] : image} />
        </div>
        <div className="product-info-container">
          <p>{title}</p>
          <p>
            <span>$ {price}</span>
          </p>
          {countOfReviews > 0 && (
            <p>
              {countOfReviews} <BsStarFill></BsStarFill> - Reviews
            </p>
          )}
        </div>

        {/* <div className="product-purchase-container">
          <button>ADD TO CART</button>
          <button>BUY NOW</button>
        </div> */}
      </div>
    </div>
  );
};

export default Product;
