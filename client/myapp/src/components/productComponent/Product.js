import "./Product.css";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { _id, title, description, price, image, unit } = product;

  const navigate = useNavigate();
  const t = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className="main-card-container">
      <div className="product-card-container">
        <FaHeart className="heart" />
        <div className="product-img-container" onClick={() => t(_id)}>
          <img src={image} />
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
