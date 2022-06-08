import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productDetail } from "../../slices/productDetailSlice";
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams();

  const { product } = useSelector((state) => state.productDetail);

  useEffect(() => {
    if (!product) {
      dispatch(productDetail({ id }));
    }
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="productDetail-container">
      <div className="product-img-btn-container">
        <div className="product-img">
          <img src="https://rukminim1.flixcart.com/image/416/416/ky90scw0/mobile/v/g/s/-original-imagagnfgffgqny2.jpeg?q=70" alt="" />
        </div>
        <div className="product-btn">
          <button>Buy Now</button>
          <button>Add To Cart</button>
        </div>
      </div>

      <div className="product-content-container">
        <h2>Title</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aliquid, rem doloribus ab laborum repudiandae ipsam quisquam aspernatur, totam recusandae, doloremque atque voluptatem. Debitis, quia!</p>
        <h2>$ 16,000</h2>

      </div>

    </div>
  );
};

export default ProductDetail;
