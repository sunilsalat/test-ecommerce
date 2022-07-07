import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  productDetail,
  getAllProductReviews,
} from "../../slices/productDetailSlice";
import { addToCart, getAllCartItems } from "../../slices/cartSlice";
import "./ProductDetail.css";
import Star from "../../components/star/Star";
import RatingAndReview from "../../components/ratingsandreviews/RatingAndReview";
import AddReveiw from "../../components/addReview/addReview";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, reviews, error, loading, reviewLoading } = useSelector(
    (state) => state.productDetail
  );
  const { userInfo } = useSelector((state) => state.profile);

  const AddProductToCart = ({ qty, productId }) => {
    dispatch(addToCart({ item_qty: qty, productId: productId }));
  };

  useEffect(() => {
    dispatch(productDetail({ id }));

    if (userInfo && userInfo.name) {
      dispatch(getAllProductReviews({ id }));
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(product);

  return (
    <>
      <div className="productDetail-container">
        <div className="product-img-btn-container">
          <div className="product-img">
            {/* image caresoul */}
            {product?.image?.length > 1 && (
              <div className="product-img-one">
                {product?.image.map((img) => {
                  return (
                    <div className="unit-img">
                      <img src={img} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* detailed image */}
            <div className="product-img-two">
              <img
                src={
                  Array.isArray(product.image)
                    ? product.image[0]
                    : product.image
                }
                alt=""
              />
            </div>
          </div>
          <div className="product-btn">
            <button>BUY NOW</button>
            <button
              onClick={() =>
                AddProductToCart({ qty: 1, productId: product._id })
              }
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

          {/* <p>Seller-{product && product.seller.name}</p> */}

          <div className="review-container">
            {reviews &&
              reviews.map((review) => {
                return <RatingAndReview review={review} key={review._id} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
