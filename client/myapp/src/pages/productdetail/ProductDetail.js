import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css";
import { useEffect, useState } from "react";
import { addToCart } from "../../slices/cartSlice";
import Star from "../../components/star/Star";
import RatingAndReview from "../../components/ratingsandreviews/RatingAndReview";
import AddReveiw from "../../components/addReview/addReview";
import {
  productDetail,
  getAllProductReviews,
  emptyProductDetail,
} from "../../slices/productDetailSlice";

const ProductDetail = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const { id } = useParams();

  const {
    product,
    reviews,
    error,
    loading,
    reviewLoading,
    lastPage,
    currentPage,
  } = useSelector((state) => state.productDetail);
  const { userInfo } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddProductToCart = ({ qty, productId }) => {
    // force user to login if not logged in
    if (!userInfo) {
      navigate(`/signin?path=/product-detail/${productId}`);
    }
    // only add item to cart when user is  logged in
    if (userInfo) {
      dispatch(addToCart({ item_qty: qty, productId: productId })).then((e) => {
        if (e.payload.msg === "Item added") {
          navigate("/cart");
        }
      });
    }
  };

  useEffect(() => {
    dispatch(productDetail({ id }));

    if (userInfo && userInfo.name) {
      dispatch(getAllProductReviews({ id }));
    }

    return () => {
      setImgIndex(0);
      dispatch(emptyProductDetail());
    };
  }, [id]);

  if (loading || !product?.hasOwnProperty("title")) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="productDetail-container">
        <div className="product-img-btn-container">
          <div className="product-img-section">
            {/* image caresoul */}
            {product?.image?.length > 1 && (
              <div className="product-img-one">
                {product?.image?.map((img, index) => {
                  return (
                    <img
                      key={index}
                      className="unit-img"
                      src={img}
                      onClick={() => setImgIndex(index)}
                    />
                  );
                })}
              </div>
            )}

            {/* detailed image */}
            <div className="product-img-two">
              <img src={product?.image[imgIndex]} alt="" />
            </div>
          </div>

          <div className="product-btn">
            <button>BUY NOW</button>
            <button
              onClick={() =>
                AddProductToCart({ qty: 1, productId: product._id })
              }
              disabled={product?.unit <= 0}
            >
              ADD TO CART
            </button>
          </div>

          <div className="write-review-container">
            <span>{error}</span>
            {userInfo ? (
              reviewLoading ? (
                "Loading..."
              ) : (
                <AddReveiw productId={product._id} />
              )
            ) : (
              "Login to write review"
            )}
          </div>
        </div>

        <div className="product-content-container">
          <h3> {product && product.title}</h3>

          {product && (
            <span>
              <Star count={product.avgRatings} /> Total Reviews(
              {product.countOfReviews})
            </span>
          )}
          <h3>$ {product && product.price}</h3>

          <p>
            Seller- <b>{product?.seller?.name}</b>
          </p>
          <p>{product?.unit} Unit In-stock</p>

          <div className="review-container">
            {reviews &&
              reviews.map((review, index) => {
                return (
                  <RatingAndReview
                    review={review}
                    key={review._id}
                    index={index}
                    lastPage={lastPage}
                    currentPage={currentPage}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
