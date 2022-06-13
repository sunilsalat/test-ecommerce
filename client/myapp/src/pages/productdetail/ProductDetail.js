import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productDetail } from "../../slices/productDetailSlice";
import { addToCart, getAllCartItems } from "../../slices/cartSlice";
import "./ProductDetail.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state.productDetail);

  const cartHandler = ({ qty, productId }) => {
    dispatch(addToCart({ item_qty: qty, productId: productId }));
    dispatch(getAllCartItems());
  };

  useEffect(() => {
    dispatch(productDetail({ id }));
  }, [id]);

  return (
    <div className="productDetail-container">
      <div className="product-img-btn-container">
        <div className="product-img">
          <img src={product && product.image} alt="" />
        </div>
        <div className="product-btn">
          <button>BUY NOW</button>
          <button
            onClick={() => cartHandler({ qty: 1, productId: product._id })}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="product-content-container">
        <h2> {product && product.title}</h2>
        <p>{product && product.description}</p>
        <h2>{product && product.price}</h2>
      </div>
    </div>
  );
};

export default ProductDetail;
