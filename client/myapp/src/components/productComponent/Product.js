import "./Product.css";
const Product = ({ product }) => {
  const { _id, title, description, price, image, unit } = product;
  return (
    <div className="main-card-container">
      <div className="product-card-container">
        <div className="product-img-container">
          <img src={image} />
        </div>
        <div className="product-info-container">
          <p>{title}</p>
          <p>Price - 499</p>
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
