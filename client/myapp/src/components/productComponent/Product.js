import "./Product.css";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";

const Product = ({ product, index, len, lastPage, currentPage }) => {
  const { _id, title, price, image } = product;

  /// pagination
  const navigate = useNavigate();
  const elemRef = useRef();

  const observer = useCallback((node) => {
    if (elemRef.current) elemRef.current.disconnect();
    elemRef.current = new IntersectionObserver((entries) => {
      if (currentPage < lastPage && entries[0].isIntersecting) {
        navigate(`/?page=${currentPage + 1}`);
      }
    });

    if (node) elemRef.current.observe(node);
  });

  const t = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div
      className="main-card-container"
      // add InterceptorObserver to last product
      ref={index + 1 === len ? observer : null}
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
        </div>
        <div className="product-purchase-container">
          <button>ADD TO CART</button>
          <button>BUY NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
